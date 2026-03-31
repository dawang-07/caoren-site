// ===== 手风琴 (Accordion) 交互 =====
function initAccordion() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const header = item.querySelector('.accordion-header');
        const content = item.querySelector('.accordion-content');

        header.addEventListener('click', () => {
            // 如果点击的是已经打开的，则关闭它
            if (item.classList.contains('active')) {
                item.classList.remove('active');
                content.style.maxHeight = '0px';
            } else {
                // 关闭所有其他的
                accordionItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0px';
                });

                // 打开当前点击的
                item.classList.add('active');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });
}

// ===== 滚动淡入动画 =====
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.section, .hero-metrics, .info-avatar, .skills-list, .portfolio-card, .education-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
}


// ===== 初始化所有功能 =====
function init() {
    try {
        initAccordion();
        initScrollAnimations();
        console.log('[SYSTEM] Cyber-Streamlined Final Version Initialized.');
    } catch (error) {
        console.error('[SYSTEM] Initialization Failure:', error);
    }
}

// 确保 DOM 加载完毕后执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== 控制台彩蛋 =====
console.log(`%c
  ██████╗ ██╗   ██╗ ██████╗ ███████╗ ██████╗ 
  ██╔════╝ ██║   ██║ ██╔══██╗ ██╔════╝ ██╔══██╗
  ██║      ██║   ██║ ██████╔╝ █████╗   ██████╔╝
  ██║      ██║   ██║ ██╔══██╗ ██╔══╝   ██╔══██╗
  ╚██████╗ ╚██████╔╝ ██║  ██║ ███████╗ ██║  ██║
   ╚═════╝  ╚═════╝  ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝
%c[CONNECTION ESTABLISHED] Welcome, Operator.`, 
'font-family: monospace; color: #00f0ff;', 
'font-family: monospace; color: #ff0080;');
