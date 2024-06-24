

document.addEventListener('DOMContentLoaded', () => {
    const headers = document.querySelectorAll('.content-section h2');

    function hideAllContents() {
        // �������ж�������ݲ���
        document.querySelectorAll('.extra-content').forEach(content => {
            content.style.display = 'none';
        });
    }

    function deactivateAllHeaders() {
        // ������header�������ϸ�ָ�Ĭ��ֵ
        headers.forEach(header => {
            header.classList.remove('active-header');
        });
    }

    headers.forEach(header => {
        header.addEventListener('click', () => {
            // ���������������ݲ��ֺ��������header�ļ���״̬
            hideAllContents();
            deactivateAllHeaders();

            // ��ʾ������� h2 ��Ӧ�����ݲ���
            const section = header.getAttribute('data-section');
            const contentElement = document.getElementById(`${section}-more`);

            // �������� h2
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
var currentIndex = 0; // ��ǰͼƬ����
var slideInterval; // ���ڴ洢�Զ��л��Ķ�ʱ��

// ���ñ���ͼƬ����
function setBackground(index) {
    var imageUrl = `url('${images[index]}')`;
    document.getElementById('top-banner').style.backgroundImage = imageUrl;
}

// �л�����һ��ͼƬ�ĺ���
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    setBackground(currentIndex);
}

// �����Զ�����
function startSlideShow() {
    slideInterval = setInterval(nextImage, 3000); // ÿ4���л�һ��ͼƬ
}

// ֹͣ�Զ�����
function stopSlideShow() {
    clearInterval(slideInterval);
}

// ��ʾ��ʼ��ͼƬ
setBackground(currentIndex);

// �����Զ�����
startSlideShow();

// ��һ��ͼƬ��ť����
document.getElementById('prev-btn').addEventListener('click', function () {
    stopSlideShow(); // ֹͣ�Զ�����
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    setBackground(currentIndex);
    startSlideShow(); // ���¿�ʼ�Զ�����
});

// ��һ��ͼƬ��ť����
document.getElementById('next-btn').addEventListener('click', function () {
    stopSlideShow(); // ֹͣ�Զ�����
    nextImage();
    startSlideShow(); // ���¿�ʼ�Զ�����
});

document.addEventListener('DOMContentLoaded', () => {
    // ��׽���ύ
    document.getElementById('message-form').addEventListener('submit', function (e) {
        e.preventDefault(); // ��ֹ����Ĭ���ύ��Ϊ

        // ��ȡ�û��������������
        var messageInput = document.getElementById('message-input');
        var message = messageInput.value.trim();

        // ȷ�����Բ�Ϊ��
        if (message) {
            // ����һ���µ��б���
            var newMessageItem = document.createElement("li");
            newMessageItem.textContent = message;  // �����б�����ı�Ϊ��������

            // ���µ��б�����ӵ������б���
            document.getElementById("messages-list").appendChild(newMessageItem);

            // ��ʾ�ύ�ɹ�����ʾ
            var messageSuccess = document.getElementById('message-success');
            messageSuccess.style.display = 'block';

            // ���������Ա������µ�����
            messageInput.value = '';

            // ��ѡ�����óɹ���ʾ������Զ���ʧ 
            setTimeout(() => {
                messageSuccess.style.display = 'none';
            }, 5000); // ���磬5������سɹ���ʾ
        } else {
            // �������Ϊ�գ������û�����ѡ�Ĳ�����
            alert("���������������ݣ�");
        }
    });
});

// ��ȡģ̬��Ԫ��
var modal = document.getElementById("myModal");

// ��ȡ <span> Ԫ�أ������ر�ģ̬��
var span = document.getElementsByClassName("close")[0];

// ��ʾģ̬��
function showMessageModal() {
    modal.style.display = "block";
}

// ��� <span> (x), �ر�ģ̬��
span.onclick = function () {
    modal.style.display = "none";
}

// ���ģ̬���������Ҳ�ܹر�ģ̬��
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}