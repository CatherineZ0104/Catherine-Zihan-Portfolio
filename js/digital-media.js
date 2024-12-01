document.addEventListener('DOMContentLoaded', () => {
    // 初始化每个部分的轮播
    const swipers = document.querySelectorAll('.swiper-container').forEach((element, index) => {
        new Swiper(element, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: element.querySelector('.swiper-pagination'),
                clickable: true,
            },
            navigation: {
                nextEl: element.querySelector('.swiper-button-next'),
                prevEl: element.querySelector('.swiper-button-prev'),
            },
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
        });
    });

    // 模态框功能
    const modal = document.getElementById('portfolio-modal');
    const closeButtons = document.querySelectorAll('.close-btn, .close-modal-btn');
    const viewPortfolioBtn = document.querySelector('.view-portfolio-btn');

    // 打开模态框
    window.openPortfolioModal = function() {
        if (modal) {
            modal.style.display = 'flex';
        }
    }

    // 关闭模态框
    function closePortfolioModal() {
        if (modal) {
            modal.style.display = 'none';
        }
    }

    // 关闭按钮事件
    closeButtons.forEach(button => {
        button.addEventListener('click', closePortfolioModal);
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePortfolioModal();
        }
    });

    // ESC 键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closePortfolioModal();
        }
    });

    // 图片点击事件
    document.querySelectorAll('.poster-item img').forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.className = 'fullscreen-image-modal';
            modal.style.display = 'flex';

            const fullImg = document.createElement('img');
            fullImg.src = img.src;

            const closeBtn = document.createElement('button');
            closeBtn.className = 'close-image-btn';
            closeBtn.innerHTML = '×';

            closeBtn.onclick = () => modal.remove();

            modal.onclick = (e) => {
                if (e.target === modal) {
                    modal.remove();
                }
            };

            modal.appendChild(fullImg);
            modal.appendChild(closeBtn);
            document.body.appendChild(modal);
        });
    });

    // 下载按钮事件
    document.querySelectorAll('.download-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const img = btn.closest('.poster-item').querySelector('img');
            const link = document.createElement('a');
            link.href = img.src;
            link.download = img.src.split('/').pop();
            link.click();
        });
    });

    // 添加视频结束事件处理
    const backgroundVideo = document.querySelector('.background-video video');
    if (backgroundVideo) {
        backgroundVideo.addEventListener('ended', () => {
            backgroundVideo.classList.add('ended');
            // 等待淡出动画完成后移除视频元素
            setTimeout(() => {
                backgroundVideo.remove();  // 完全移除视频元素
            }, 1000);
        });
    }
}); 