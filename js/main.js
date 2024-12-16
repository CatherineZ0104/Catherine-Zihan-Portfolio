// 自动更新页脚年份
document.getElementById('year').textContent = new Date().getFullYear();

// 设置当前页面导航项的激活状态
document.addEventListener('DOMContentLoaded', () => {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (item.getAttribute('href') === currentPage) {
            item.classList.add('active');
        }
    });
});

// 轮播控制函数
let slideIndices = {};

function showSlides(slideIndex, container) {
    const containerId = Array.from(document.querySelectorAll('.slideshow-container')).indexOf(container);
    if (slideIndices[containerId] === undefined) {
        slideIndices[containerId] = 0;
    }

    const slides = container.getElementsByClassName("slides");
    
    if (slideIndex !== undefined) {
        slideIndices[containerId] = slideIndex;
    }

    if (slideIndices[containerId] >= slides.length) {
        slideIndices[containerId] = 0;
    }
    if (slideIndices[containerId] < 0) {
        slideIndices[containerId] = slides.length - 1;
    }

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndices[containerId]].style.display = "block";
}

function changeSlide(n, element) {
    const container = element.closest('.slideshow-container');
    const containerId = Array.from(document.querySelectorAll('.slideshow-container')).indexOf(container);
    showSlides(slideIndices[containerId] + n, container);
}

// 初始化所有轮播
document.addEventListener('DOMContentLoaded', function() {
    const containers = document.querySelectorAll('.slideshow-container');
    containers.forEach((container, index) => {
        showSlides(0, container);
        
        // 自动轮播
        setInterval(() => {
            showSlides(slideIndices[index] + 1, container);
        }, 3000);
    });
});

// 图片放大功能
document.addEventListener('DOMContentLoaded', function() {
    // 获取模态框元素
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeBtn = document.getElementsByClassName('close')[0];

    // 为所有轮播图中的图片添加点击事件
    document.querySelectorAll('.slides img').forEach(img => {
        img.style.cursor = 'pointer'; // 添加鼠标手型
        img.addEventListener('click', function() {
            modal.style.display = 'block';
            modalImg.src = this.src;
        });
    });

    // 点击关闭按钮关闭模态框
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });

    // 点击模态框外部关闭模态框
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}); 