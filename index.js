document.addEventListener('DOMContentLoaded', () => {
    // Section 展开/隐藏功能
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

var images = [
    '112.jpg', '113.jpeg', '120.jpeg', '115.png',
    '116.jpg', '117.jpeg', '118.jpeg', '119.png', '114.jpeg'
];
var currentIndex = 0; // 当前图片索引
var slideInterval; // 用于存储自动切换的定时器

// 设置背景图片函数
function setBackground(index) {
    var imageUrl = `url('${images[index]}')`;
    document.getElementById('top-banner').style.backgroundImage = imageUrl;
}

// 切换到下一张图片的函数
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    setBackground(currentIndex);
}

// 开启自动播放
function startSlideShow() {
    slideInterval = setInterval(nextImage, 3000); // 每4秒切换一次图片
}

// 停止自动播放
function stopSlideShow() {
    clearInterval(slideInterval);
}

// 显示初始化图片
setBackground(currentIndex);

// 启动自动播放
startSlideShow();

// 上一张图片按钮监听
document.getElementById('prev-btn').addEventListener('click', function () {
    stopSlideShow(); // 停止自动播放
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setBackground(currentIndex);
    startSlideShow(); // 重新开始自动播放
});

// 下一张图片按钮监听
document.getElementById('next-btn').addEventListener('click', function () {
    stopSlideShow(); // 停止自动播放
    nextImage();
    startSlideShow(); // 重新开始自动播放
});

    // 模态框逻辑
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

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
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

    function checkWinner() {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes(null) ? null : 'Tie';
    }

    function updateTurnIndicator() {
        turnIndicator.textContent = isXTurn ? 'Your Turn!' : 'Computer\'s Turn...';
    }

    function showWinnerMessage(winner) {
        winnerMessage.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
        winnerMessage.style.display = 'block';
    }

    function placeMove(index, symbol) {
        board[index] = symbol;
        const cell = cells[index];
        cell.textContent = symbol;
        cell.classList.add('taken');

        const winner = checkWinner();
        if (winner) {
            showWinnerMessage(winner);
            return true;
        }
        return false;
    }

    function computerMove() {
        const emptyCells = board
            .map((value, index) => (value === null ? index : null))
            .filter(index => index !== null);

        for (const [a, b, c] of winPatterns) {
            if (board[a] === computerSymbol && board[b] === computerSymbol && board[c] === null) return placeMove(c, computerSymbol);
            if (board[a] === computerSymbol && board[c] === computerSymbol && board[b] === null) return placeMove(b, computerSymbol);
            if (board[b] === computerSymbol && board[c] === computerSymbol && board[a] === null) return placeMove(a, computerSymbol);
        }

        for (const [a, b, c] of winPatterns) {
            if (board[a] === playerSymbol && board[b] === playerSymbol && board[c] === null) return placeMove(c, computerSymbol);
            if (board[a] === playerSymbol && board[c] === playerSymbol && board[b] === null) return placeMove(b, computerSymbol);
            if (board[b] === playerSymbol && board[c] === playerSymbol && board[a] === null) return placeMove(a, computerSymbol);
        }

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        placeMove(randomIndex, computerSymbol);
    }

    function resetGame() {
        board.fill(null);
        isXTurn = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken', 'disabled');
        });
        winnerMessage.style.display = 'none';
        updateTurnIndicator();
    }

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
