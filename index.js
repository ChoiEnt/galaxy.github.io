

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

document.addEventListener('DOMContentLoaded', () => {
    // 页面加载时，尝试从 LocalStorage 加载并显示留言
    const savedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    savedMessages.forEach(message => addMessageToList(message));

    document.getElementById('message-form').addEventListener('submit', function (e) {
        e.preventDefault(); // 阻止表单的默认提交行为

        // 获取用户输入的留言内容
        var messageInput = document.getElementById('message-input');
        var message = messageInput.value.trim();

        // 确保留言不为空
        if (message) {
            addMessageToList(message);

            // 更新LocalStorage
            const messages = JSON.parse(localStorage.getItem('messages')) || [];
            messages.push(message);
            localStorage.setItem('messages', JSON.stringify(messages));

            // 显示提交成功的提示
            var messageSuccess = document.getElementById('message-success');
            messageSuccess.style.display = 'block';

            // 清空输入框，以便输入新的留言
            messageInput.value = '';

            setTimeout(() => {
                messageSuccess.style.display = 'none';
            }, 5000); // 5秒后隐藏成功提示
        } else {
            alert("请先输入留言内容！");
        }
    });
});

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
    let isXTurn = true; // 初始为 X 的回合
    const board = Array(9).fill(null); // 游戏状态

    // 显示游戏界面并隐藏开始界面
    playGameButton.addEventListener('click', () => {
        startScreen.style.display = 'none';
        gameScreen.style.display = 'block';
    });

    // 点击“不玩”按钮的行为
    noThanksButton.addEventListener('click', () => {
        startScreen.innerHTML = "<p>Maybe next time! 😊</p>";
    });

    // 玩家点击格子
    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => {
            if (board[index]) return; // 已被占用

            board[index] = isXTurn ? 'X' : 'O'; // 更新状态
            cell.textContent = board[index]; // 显示符号
            cell.classList.add('taken');

            if (checkWinner(board)) {
                winnerMessage.style.display = 'block';
                winnerMessage.textContent = `Player ${isXTurn ? 'X' : 'O'} Wins!`;
                endGame();
            } else if (board.every(Boolean)) {
                winnerMessage.style.display = 'block';
                winnerMessage.textContent = "It's a Draw!";
                endGame();
            }

            isXTurn = !isXTurn; // 切换回合
        });
    });

    // 重置游戏
    restartButton.addEventListener('click', () => {
        board.fill(null);
        isXTurn = true;
        winnerMessage.style.display = 'none';
        restartButton.style.display = 'none';
        cells.forEach(cell => {
            cell.textContent = '';
            cell.classList.remove('taken');
        });
    });

    // 检查胜利
    function checkWinner(board) {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // 横
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // 竖
            [0, 4, 8], [2, 4, 6]            // 对角
        ];
        return winPatterns.some(pattern =>
            pattern.every(index => board[index] && board[index] === board[pattern[0]])
        );
    }

    // 禁用所有格子
    function endGame() {
        cells.forEach(cell => cell.classList.add('taken'));
        restartButton.style.display = 'block';
    }
});
