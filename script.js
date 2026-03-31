// ===== 主动导航链接 =====
function initActiveNav() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href').substring(1) === entry.target.id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
}

// ===== 弹窗功能 =====
function initModal() {
    const backdrop = document.getElementById('modalBackdrop');
    const modalContent = backdrop.querySelector('.modal-content');
    const modalTitle = backdrop.querySelector('.modal-title');
    const modalBody = backdrop.querySelector('.modal-body');
    const hiddenContent = document.getElementById('modal-hidden-content');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal-target');
            const title = item.querySelector('h3').textContent;
            const content = hiddenContent.querySelector(`[data-id="${modalId}"]`).innerHTML;
            
            modalTitle.textContent = `档案: ${title}`;
            modalBody.innerHTML = content;
            
            typewriter(modalBody); // 应用打字机效果
            backdrop.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    };

    backdrop.querySelector('.modal-close').addEventListener('click', closeModal);
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
}

// ===== 打字机效果 =====
function typewriter(element) {
    const allElements = element.querySelectorAll('h4, li, span, div');
    allElements.forEach(el => {
        const text = el.innerHTML; // 保留 HTML 标签
        el.innerHTML = '';
        el.style.visibility = 'hidden';

        setTimeout(() => {
            el.style.visibility = 'visible';
            let i = 0;
            const timer = setInterval(() => {
                if (i < text.length) {
                    // 检查是否是标签的开始
                    if (text.charAt(i) === '<') {
                        const tagEnd = text.indexOf('>', i);
                        if (tagEnd !== -1) {
                            el.innerHTML += text.substring(i, tagEnd + 1);
                            i = tagEnd;
                        }
                    } else {
                        el.innerHTML += text.charAt(i);
                    }
                    i++;
                } else {
                    clearInterval(timer);
                }
            }, 10); // 打字速度
        }, Math.random() * 200);
    });
}

// ===== 滚动动画 =====
function initScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.hud-panel, .module-card, .timeline-item, .arsenal-card');

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
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ===== 初始化 =====
function init() {
    try {
        initActiveNav();
        initModal();
        initScrollAnimations();
        console.log('✅ Cyber-Pixel Engine Initialized!');
    } catch (error) {
        console.error('❌ Engine Failure:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);

// ===== 控制台彩蛋 =====
console.log(`%c
   ██████╗ ██╗   ██╗ ██████╗ ███████╗ ██████╗ 
  ██╔════╝ ██║   ██║ ██╔══██╗ ██╔════╝ ██╔══██╗
  ██║      ██║   ██║ ██████╔╝ █████╗   ██████╔╝
  ██║      ██║   ██║ ██╔══██╗ ██╔══╝   ██╔══██╗
  ╚██████╗ ╚██████╔╝ ██║  ██║ ███████╗ ██║  ██║
   ╚═════╝  ╚═════╝  ╚═╝  ╚═╝ ╚══════╝ ╚═╝  ╚═╝
                                               
%c[SYSTEM ONLINE] Welcome, Operator.`, 
'font-family: monospace; color: #f92572;', 
'font-family: monospace; color: #00e5ff;');
