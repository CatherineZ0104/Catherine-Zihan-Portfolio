document.addEventListener('DOMContentLoaded', function() {
    // 初始化所有轮播图
    const portraitSwipers = document.querySelectorAll('.portrait-swiper').forEach((element) => {
        new Swiper(element, {
            slidesPerView: 1,
            spaceBetween: 0,
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

    // 照片画廊功能
    const modal = document.querySelector('.photo-gallery-modal');
    const mainPhoto = modal.querySelector('.main-photo img');
    const prevBtn = modal.querySelector('.prev-photo');
    const nextBtn = modal.querySelector('.next-photo');
    const closeBtn = modal.querySelector('.close-gallery');
    const thumbnailWrapper = modal.querySelector('.thumbnail-wrapper');
    
    let currentPhotos = [];
    let currentIndex = 0;

    // 为所有 View All Photos 按钮添加点击事件
    document.querySelectorAll('.view-all-photos-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.portrait-card, .culture-card');
            const images = Array.from(card.querySelectorAll('.swiper-slide img')).map(img => img.src);
            openPhotoGallery(images);
        });
    });

    // 为所有 Animal 图片添加点击事件
    document.querySelectorAll('.animal-image').forEach((img, index) => {
        img.addEventListener('click', () => {
            const allAnimalImages = Array.from(document.querySelectorAll('.animal-image')).map(img => img.src);
            openPhotoGallery(allAnimalImages, index);
        });
    });

    // 打开照片画廊
    function openPhotoGallery(photos, startIndex = 0) {
        currentPhotos = photos;
        currentIndex = startIndex;
        modal.style.display = 'flex';
        updateGallery();
        createThumbnails();
    }

    // 更新画廊显示
    function updateGallery() {
        mainPhoto.src = currentPhotos[currentIndex];
        updateThumbnailSelection();
    }

    // 创建缩略图
    function createThumbnails() {
        thumbnailWrapper.innerHTML = '';
        currentPhotos.forEach((photo, index) => {
            const thumb = document.createElement('img');
            thumb.src = photo;
            thumb.classList.add('thumbnail');
            if (index === currentIndex) thumb.classList.add('active');
            thumb.addEventListener('click', () => {
                currentIndex = index;
                updateGallery();
            });
            thumbnailWrapper.appendChild(thumb);
        });
    }

    // 更新缩略图选中状态
    function updateThumbnailSelection() {
        thumbnailWrapper.querySelectorAll('.thumbnail').forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentIndex);
        });
    }

    // 事件监听器
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + currentPhotos.length) % currentPhotos.length;
        updateGallery();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % currentPhotos.length;
        updateGallery();
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // ESC键关闭模态框
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });

    // 点击模态框外部关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // 为键盘左右键添加监听
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'ArrowLeft') prevBtn.click();
            if (e.key === 'ArrowRight') nextBtn.click();
        }
    });
}); 