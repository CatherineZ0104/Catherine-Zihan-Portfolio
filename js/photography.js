document.addEventListener('DOMContentLoaded', () => {
    // 初始化所有轮播图
    const swipers = document.querySelectorAll('.culture-swiper').forEach((element) => {
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
            }
        });
    });

    // 为所有 View All Photos 按钮添加点击事件
    document.querySelectorAll('.view-all-photos-btn').forEach((btn) => {
        btn.addEventListener('click', function() {
            const card = this.closest('.culture-card');
            const cardTitle = card.querySelector('h3').textContent;
            
            const modal = document.querySelector('.photo-gallery-modal');
            const mainPhoto = modal.querySelector('.main-photo img');
            const thumbnailWrapper = modal.querySelector('.thumbnail-wrapper');
            
            // 清空缩略图容器
            thumbnailWrapper.innerHTML = '';
            
            // 根据卡片类型设置不同的图片路径和总数
            let basePath = '';
            let totalPhotos = 0;
            let fileExt = '.jpg';  // 默认扩展名
            
            switch(cardTitle) {
                case 'Kazak':
                    basePath = '/Users/zzh/Documents/伟大的张紫涵领导/申请/PHD/Catherine(Zihan)Zhang/imgs/Photography/Kazak/Kazak';
                    totalPhotos = 5;
                    break;
                case 'Khalkhas':
                    basePath = '/Users/zzh/Documents/伟大的张紫涵领导/申请/PHD/Catherine(Zihan)Zhang/imgs/Photography/Khalkhas/Khalkhas';
                    totalPhotos = 5;
                    break;
                case 'Ancient Costume':
                    basePath = '/Users/zzh/Documents/伟大的张紫涵领导/申请/PHD/Catherine(Zihan)Zhang/imgs/Photography/Hair Flower in Qin Dynasty/Hair Flower ';
                    totalPhotos = 10;
                    fileExt = '.JPG';
                    break;
                case 'Uyghur':
                    basePath = '/Users/zzh/Documents/伟大的张紫涵领导/申请/PHD/Catherine(Zihan)Zhang/imgs/Photography/Uyghur/Uyghur';
                    totalPhotos = 25;
                    fileExt = '.JPG';
                    break;
                case 'Animal':
                    basePath = '/Users/zzh/Documents/伟大的张紫涵领导/申请/PHD/Catherine(Zihan)Zhang/imgs/Photography/Animal/Animal';
                    totalPhotos = 9;
                    fileExt = '.jpg';
                    break;
            }

            // 设置第一张图片
            mainPhoto.src = `${basePath}1${fileExt}`;
            
            // 添加所有缩略图
            for (let i = 1; i <= totalPhotos; i++) {
                const thumb = document.createElement('img');
                thumb.src = `${basePath}${i}${fileExt}`;
                thumb.className = 'thumbnail';
                if (i === 1) thumb.classList.add('active');
                
                thumb.addEventListener('click', () => {
                    mainPhoto.src = thumb.src;
                    thumbnailWrapper.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
                    thumb.classList.add('active');
                });
                
                thumbnailWrapper.appendChild(thumb);
            }
            
            // 显示模态框
            modal.style.display = 'block';

            // 添加左右导航按钮事件
            let currentIndex = 0;

            const prevBtn = modal.querySelector('.prev-photo');
            const nextBtn = modal.querySelector('.next-photo');

            prevBtn.onclick = () => {
                currentIndex = (currentIndex - 1 + totalPhotos) % totalPhotos;
                mainPhoto.src = `${basePath}${currentIndex + 1}${fileExt}`;
                updateThumbnails(currentIndex);
            };

            nextBtn.onclick = () => {
                currentIndex = (currentIndex + 1) % totalPhotos;
                mainPhoto.src = `${basePath}${currentIndex + 1}${fileExt}`;
                updateThumbnails(currentIndex);
            };

            function updateThumbnails(index) {
                thumbnailWrapper.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                    thumb.classList.toggle('active', i === index);
                });
            }

            // 添加关闭按钮事件
            const closeBtn = modal.querySelector('.close-gallery');
            closeBtn.onclick = () => {
                modal.style.display = 'none';
            };

            // 点击模态框背景关闭
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });

            // ESC键关闭模态框
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    modal.style.display = 'none';
                }
            });
        });
    });
}); 