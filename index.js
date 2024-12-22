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

    // 图片轮播功能
    const images = [
        '112.jpg', '113.jpeg', './images/120.jpeg', './images/115.png',
        './images/116.jpg', './images/117.jpeg', './images/118.jpeg', './images/119.png', './images/114.jpeg'
    ];
    let currentIndex = 0;
    let slideInterval;

    function setBackground(index) {
        const imageUrl = `url('${images[index]}')`;
        document.getElementById('top-banner').style.backgroundImage = imageUrl;
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        setBackground(currentIndex);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextImage, 4000); // 每4秒切换一次图片
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    setBackground(currentIndex);
    startSlideShow();

    document.getElementById('prev-btn').addEventListener('click', function () {
        stopSlideShow();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        setBackground(currentIndex);
        startSlideShow();
    });

    document.getElementById('next-btn').addEventListener('click', function () {
        stopSlideShow();
        nextImage();
        startSlideShow();
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

    // Tic-Tac-Toe 游戏功能
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const playGameButton = document.getElementById('play-game');
    const noThanksButton = document.getElementById('no-thanks');
    const winnerMessage = document.getElementById('winner-message');
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restart');
    let isXTurn = true;
    const board = Array(9).fill(null);

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes(null) ? null : 'Tie';
    }

    function resetGame() {
        board.fill(null);
        isXTurn = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken');
        });
        winnerMessage.style.display = 'none';
    }

    playGameButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });

    noThanksButton.addEventListener('click', () => {
        startScreen.innerHTML = "<p>Maybe next time! 😊</p>";
    });

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (board[index] || winnerMessage.style.display === 'block') return;
            board[index] = isXTurn ? 'X' : 'O';
            cell.textContent = board[index];
            cell.classList.add('taken');

            const winner = checkWinner();
            if (winner) {
                winnerMessage.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
                winnerMessage.style.display = 'block';
                return;
            }
            isXTurn = !isXTurn;
        });
    });

    restartButton.addEventListener('click', resetGame);
});
