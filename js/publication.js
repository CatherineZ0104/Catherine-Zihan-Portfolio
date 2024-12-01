pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

let currentPdf = null;
let currentPage = 1;
let zoomLevel = 1.0;
let currentPdfPath = '';

document.addEventListener('DOMContentLoaded', () => {
    const expandButtons = document.querySelectorAll('.expand-btn');
    const pdfContainer = document.querySelector('.pdf-viewer-container');
    const pdfViewer = document.getElementById('pdf-viewer');
    const backButton = document.getElementById('back-to-publications');
    const viewPdfButtons = document.querySelectorAll('.view-pdf-btn');
    const downloadBtn = document.getElementById('download-pdf');
    const fullscreenBtn = document.getElementById('fullscreen-pdf');

    // 展开/收起论文详情
    expandButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.parentElement;
            const details = card.querySelector('.paper-details');
            
            if (details.style.display === 'none') {
                details.style.display = 'block';
                button.textContent = 'Hide Details';
            } else {
                details.style.display = 'none';
                button.textContent = 'View Details';
            }
        });
    });

    // 查看 PDF
    viewPdfButtons.forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('.pub-card');
            const pdfPath = card.dataset.pdf;
            const pdfViewer = document.getElementById('pdf-viewer');
            
            // 直接使用完整路径，不需要额外添加
            pdfViewer.src = pdfPath;
            
            // 显示 PDF 查看器容器
            document.querySelector('.pdf-viewer-container').style.display = 'flex';
        });
    });

    // 返回按钮
    backButton.addEventListener('click', () => {
        pdfContainer.style.display = 'none';
        pdfViewer.src = '';
    });

    // 下载按钮事件
    downloadBtn.addEventListener('click', () => {
        const pdfViewer = document.getElementById('pdf-viewer');
        if (pdfViewer.src) {
            window.open(pdfViewer.src.split('#')[0], '_blank');
        }
    });

    // 全屏按钮事件
    fullscreenBtn.addEventListener('click', () => {
        const pdfViewer = document.getElementById('pdf-viewer');
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            pdfViewer.requestFullscreen().catch(err => {
                console.error('Error attempting to enable fullscreen:', err);
            });
        }
    });
});

async function openPdfViewer(pdfPath) {
    const container = document.querySelector('.pdf-viewer-container');
    container.style.display = 'flex';
    
    try {
        const rootPath = window.location.origin + window.location.pathname.split('/pages/')[0];
        const fullPath = `${rootPath}/files/${pdfPath.split('/').pop()}`;
        
        console.log('Loading PDF from:', fullPath);
        const loadingTask = pdfjsLib.getDocument({
            url: fullPath,
            cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.4.120/cmaps/',
            cMapPacked: true,
        });

        const pdf = await loadingTask.promise;
        currentPdf = pdf;
        currentPdfPath = fullPath;
        currentPage = 1;
        document.getElementById('page-count').textContent = pdf.numPages;
        
        const pdfViewer = document.getElementById('pdf-viewer');
        pdfViewer.style.display = 'block';
        pdfViewer.style.height = '100%';
        pdfViewer.style.overflow = 'auto';
        
        await renderPage();
    } catch (error) {
        console.error('Error loading PDF:', error);
        alert('Unable to load PDF file. Please check the file path: ' + pdfPath);
        container.style.display = 'none';
    }
}

async function renderPage() {
    if (!currentPdf) return;

    try {
        const page = await currentPdf.getPage(currentPage);
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        const containerWidth = document.getElementById('pdf-viewer').clientWidth;
        const viewport = page.getViewport({ scale: 1.0 });
        const scale = (containerWidth - 40) / viewport.width;
        const scaledViewport = page.getViewport({ scale: scale * zoomLevel });

        canvas.width = scaledViewport.width;
        canvas.height = scaledViewport.height;

        const renderContext = {
            canvasContext: context,
            viewport: scaledViewport,
            enableWebGL: true
        };

        await page.render(renderContext).promise;

        const viewer = document.getElementById('pdf-viewer');
        viewer.innerHTML = '';
        viewer.appendChild(canvas);

        document.getElementById('page-num').textContent = currentPage;
        document.getElementById('zoom-level').textContent = `${Math.round(zoomLevel * 100)}%`;
    } catch (error) {
        console.error('Error rendering page:', error);
    }
}

window.addEventListener('resize', () => {
    if (currentPdf) {
        renderPage();
    }
}); 