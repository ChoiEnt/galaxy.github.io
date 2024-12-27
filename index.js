document.addEventListener('DOMContentLoaded', () => {
    // === Section 展开/隐藏功能 ===
    const headers = document.querySelectorAll('.content-section h2');

    function hideAllContents() {
        document.querySelectorAll('.extra-content').forEach(content => {
            content.style.display = 'none';
        });
    }

    function deactivateAllHeaders() {
        headers.forEach(header => {
            header.classList.remove('active-header');
        });
    }

    headers.forEach(header => {
        header.addEventListener('click', () => {
            hideAllContents();
            deactivateAllHeaders();
            const section = header.getAttribute('data-section');
            const contentElement = document.getElementById(`${section}-more`);
            header.classList.add('active-header');
            if (contentElement) {
                contentElement.style.display = 'block';
            }
        });
    });

    // === 初始化轮播 ===
    const images = ['112.jpg', '113.jpeg', '120.jpeg', '115.png', '116.jpg', '117.jpeg', '118.jpeg', '119.png', '114.jpeg'];
    let currentIndex = 0;

    const setBackground = index => {
        document.getElementById('top-banner').style.backgroundImage = `url('${images[index]}')`;
    };

    const nextImage = () => {
        currentIndex = (currentIndex + 1) % images.length;
        setBackground(currentIndex);
    };

    const prevImage = () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        setBackground(currentIndex);
    };

    let slideInterval = setInterval(nextImage, 3000); // 每3秒切换一次图片

    document.getElementById('prev-btn').addEventListener('click', () => {
        clearInterval(slideInterval);
        prevImage();
        slideInterval = setInterval(nextImage, 3000);
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        clearInterval(slideInterval);
        nextImage();
        slideInterval = setInterval(nextImage, 3000);
    });

    setBackground(currentIndex); // 显示初始化图片

    // === 模态框逻辑 ===
    const modal = document.getElementById('myModal');
    const span = document.querySelector('.close');

    if (modal && span) {
        span.onclick = function () {
            modal.style.display = "none";
        };

        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        };
    }

    // === 初始化游戏 ===
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const playgameButton = document.getElementById('play-game');
    const chooseXButton = document.getElementById('choose-x');
    const chooseOButton = document.getElementById('choose-o');
    const winnerMessage = document.getElementById('winner-message');
    const turnIndicator = document.getElementById('turn-indicator');
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restart');

    let isXTurn = true;
    let playerSymbol = 'X';
    let computerSymbol = 'O';
    const board = Array(9).fill(null);

    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    const checkWinner = () => {
        for (const [a, b, c] of winPatterns) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a]; // 返回胜者
            }
        }
        return board.includes(null) ? null : 'Tie'; // 没有空位则平局
    };

    const updateTurnIndicator = () => {
        turnIndicator.textContent = isXTurn ? 'Your Turn!' : 'Computer\'s Turn...';
    };

    const showWinnerMessage = winner => {
        winnerMessage.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
        winnerMessage.style.display = 'block';
    };

    const placeMove = (index, symbol) => {
        board[index] = symbol;
        cells[index].textContent = symbol;
        cells[index].classList.add('taken');
        const winner = checkWinner();
        if (winner) {
            showWinnerMessage(winner === 'Tie' ? winner : symbol);
            cells.forEach(cell => cell.classList.add('disabled'));
        }
        return !!winner;
    };

    const computerMove = () => {
        const emptyCells = board.map((v, i) => v === null ? i : null).filter(i => i !== null);
        if (emptyCells.length === 0) return;

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        placeMove(randomIndex, computerSymbol);
    };

    const resetGame = () => {
        board.fill(null);
        isXTurn = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken', 'disabled');
        });
        winnerMessage.style.display = 'none';
        updateTurnIndicator();
    };

    chooseXButton.addEventListener('click', () => {
        playerSymbol = 'X';
        computerSymbol = 'O';
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        updateTurnIndicator();
    });

    chooseOButton.addEventListener('click', () => {
        playerSymbol = 'O';
        computerSymbol = 'X';
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
        updateTurnIndicator();
    });

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (board[index] || winnerMessage.style.display === 'block' || !isXTurn) return;
            if (placeMove(index, playerSymbol)) return;
            isXTurn = false;
            updateTurnIndicator();
            setTimeout(() => {
                computerMove();
                isXTurn = true;
                updateTurnIndicator();
            }, 500);
        });
    });

    restartButton.addEventListener('click', resetGame);
});
