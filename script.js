// ===== 移动端菜单 =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
        
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
}

// ===== 导航栏滚动效果 =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== 平滑滚动 =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== 技能条动画 =====
function initSkillBars() {
    const skillFills = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                
                setTimeout(() => {
                    fill.style.width = width + '%';
                }, 300);
                
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.5 });

    skillFills.forEach(fill => observer.observe(fill));
}

// ===== 弹窗功能 =====
function initModal() {
    const backdrop = document.getElementById('modalBackdrop');
    const cards = document.querySelectorAll('.timeline-card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal-target');
            const modal = document.getElementById(modalId);
            
            if (modal && backdrop) {
                backdrop.classList.add('active');
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    if (backdrop) {
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop || e.target.classList.contains('modal-close')) {
                closeModal(backdrop);
            }
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal(backdrop);
            }
        });
    }
}

function closeModal(backdrop) {
    backdrop.classList.remove('active');
    const activeModal = backdrop.querySelector('.modal.active');
    if (activeModal) {
        activeModal.classList.remove('active');
    }
    document.body.style.overflow = '';
}

// ===== 数字滚动动画 =====
function animateNumbers() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                if (text.includes('%') || text.includes('$') || text.includes('→') || text.includes('年') || text.includes('品类')) {
                    return;
                }
                
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
                if (number) {
                    let current = 0;
                    const increment = number / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= number) {
                            current = number;
                            clearInterval(timer);
                        }
                        target.textContent = Math.floor(current) + suffix;
                    }, 30);
                }
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statValues.forEach(num => observer.observe(num));
}

// ===== 卡片悬停效果 =====
function initCardEffects() {
    const cards = document.querySelectorAll('.profile-card, .stat-card, .portfolio-card, .video-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            cards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            cards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
}

// ===== 页面加载动画 =====
function initPageLoad() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
}

// ===== 初始化 =====
function init() {
    try {
        initMobileMenu();
        initNavbar();
        initSmoothScroll();
        initSkillBars();
        initModal();
        animateNumbers();
        initCardEffects();
        initPageLoad();
        console.log('✅ GPT v1 - Modern Professional Design Initialized');
    } catch (error) {
        console.error('❌ Initialization error:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== 控制台彩蛋 =====
console.log(`
%c🎮 曹仁 - 游戏买量素材创意专家%c
%cModern Professional Design by GPT-4%c

💼 8 年 + 游戏买量经验
📊 CTR: 0.9% → 2.2% (+144%)
💰 CPI: $10 → $1.6 (-84%)
🎯 全品类：SLG/MMO/MOBA/三消/卡牌

📱 18510980584
📧 932120004@qq.com
`, 
    'font-size: 24px; font-weight: 900; background: linear-gradient(135deg, #6366f1, #0ea5e9); -webkit-background-clip: text; -webkit-text-fill-color: transparent;',
    '',
    'color: #94a3b8;',
    ''
);
