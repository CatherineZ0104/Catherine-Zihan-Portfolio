document.addEventListener('DOMContentLoaded', () => {
    const techButtons = document.querySelectorAll('.tech-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const copyButtons = document.querySelectorAll('.copy-btn');

    // 初始化时显示所有项目
    showAllProjects();

    // 技术按钮点击事件
    techButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tech = button.dataset.tech;
            
            // 更新按钮状态
            techButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // 显示相应的项目卡片
            projectCards.forEach(card => {
                if (card.dataset.tech === tech) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 复制按钮功能
    copyButtons.forEach(button => {
        button.addEventListener('click', () => {
            const codeBlock = button.nextElementSibling.querySelector('code');
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                    button.textContent = 'Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                })
                .catch(err => {
                    console.error('Failed to copy:', err);
                });
        });
    });

    // 默认选中第一个按钮
    if (techButtons.length > 0) {
        techButtons[0].click();
    }
});

// 显示所有项目
function showAllProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.style.display = 'block';
    });
} 