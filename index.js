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
    // Tic-Tac-Toe 游戏功能
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const playGameButton = document.getElementById('play-game');
    const noThanksButton = document.getElementById('no-thanks');
    const winnerMessage = document.getElementById('winner-message');
    const cells = document.querySelectorAll('[data-cell]');
    const restartButton = document.getElementById('restart');
    const chooseXButton = document.getElementById('choose-x');
    const chooseOButton = document.getElementById('choose-o');
    
    let isXTurn = true; // 当前回合是否为 X 的回合
    let playerSymbol = 'X'; // 玩家默认符号
    let computerSymbol = 'O'; // 电脑默认符号
    const board = Array(9).fill(null); // 游戏棋盘

    // 检查是否有获胜者
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

    // 重置游戏
    function resetGame() {
        board.fill(null);
        isXTurn = true;
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken');
        });
        winnerMessage.style.display = 'none';
    }

    // 电脑随机下棋
    function computerMove() {
        const emptyCells = board
            .map((value, index) => (value === null ? index : null))
            .filter(index => index !== null);
        if (emptyCells.length === 0) return;

        const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        board[randomIndex] = computerSymbol;
        const cell = cells[randomIndex];
        cell.textContent = computerSymbol;
        cell.classList.add('taken');

        const winner = checkWinner();
        if (winner) {
            winnerMessage.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
            winnerMessage.style.display = 'block';
            return;
        }
        isXTurn = true; // 切换回玩家
    }

    // 玩家选择 X 或 O
    chooseXButton.addEventListener('click', () => {
        playerSymbol = 'X';
        computerSymbol = 'O';
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });

    chooseOButton.addEventListener('click', () => {
        playerSymbol = 'O';
        computerSymbol = 'X';
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });

    // 玩家点击单元格
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (board[index] || winnerMessage.style.display === 'block' || !isXTurn) return;
            board[index] = playerSymbol;
            cell.textContent = playerSymbol;
            cell.classList.add('taken');

            const winner = checkWinner();
            if (winner) {
                winnerMessage.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} Wins!`;
                winnerMessage.style.display = 'block';
                return;
            }
            isXTurn = false; // 切换到电脑
            setTimeout(computerMove, 500); // 电脑延迟下棋
        });
    });

    // 重启游戏
    restartButton.addEventListener('click', resetGame);
});
