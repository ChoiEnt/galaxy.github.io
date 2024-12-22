

document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.content-section h2');

    function hideAllContents() {
        // 隐藏所有额外的内容部分
        document.querySelectorAll('.extra-content').forEach(content => {
            content.style.display = 'none';
        });
    }

    function deactivateAllHeaders() {
        // 将所有header的字体粗细恢复默认值
        headers.forEach(header => {
            header.classList.remove('active-header');
        });
    }

    headers.forEach(header => {
        header.addEventListener('click', () => {
            // 首先隐藏所有内容部分和清除所有header的激活状态
            hideAllContents();
            deactivateAllHeaders();

            // 显示被点击的 h2 对应的内容部分
            const section = header.getAttribute('data-section');
            const contentElement = document.getElementById(`${section}-more`);

            // 激活被点击的 h2
            header.classList.add('active-header');

            if (contentElement) {
                contentElement.style.display = 'block';
            }
        });
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
    ackground(currentIndex);
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
});c'c'ccccc

// 点击 <span> (x), 关闭模态框
span.onclick = function () {
    modal.style.display = "none";
}

// 点击模态框外的区域，也能关闭模态框
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');
    const playGameButton = document.getElementById('play-game');
    const noThanksButton = document.getElementById('no-thanks');
    const restartButton = document.getElementById('restart');
    const cells = document.querySelectorAll('[data-cell]');
    const winnerMessage = document.getElementById('winner-message');
    let isXTurn = true;
    const board = Array(9).fill(null);

    playGameButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });

    noThanksButton.addEventListener('click', () => {
        startScreen.innerHTML = "<p>Maybe next time! 😊</p>";
    });

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (board[index]) return;
            board[index] = isXTurn ? 'X' : 'O';
            cell.textContent = board[index];
            cell.classList.add('taken');
        });
    });
});
