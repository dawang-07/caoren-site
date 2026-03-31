// ===== 粒子效果 =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 10 + 15}s`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.opacity = Math.random() * 0.5 + 0.3;
        
        particlesContainer.appendChild(particle);
    }
}

// ===== 卡片翻转 =====
function initCardFlip() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// ===== 技能树动画 =====
function initSkillTree() {
    const skillNodes = document.querySelectorAll('.skill-node');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const node = entry.target;
                const level = node.getAttribute('data-level');
                const fill = node.querySelector('.node-fill');
                
                if (fill && level) {
                    setTimeout(() => {
                        fill.style.width = level + '%';
                    }, 300);
                }
                
                observer.unobserve(node);
            }
        });
    }, { threshold: 0.5 });

    skillNodes.forEach(node => observer.observe(node));
}

// ===== 导航栏滚动效果 =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(10, 10, 18, 0.98)';
            navbar.style.boxShadow = '0 5px 30px rgba(0, 240, 255, 0.2)';
        } else {
            navbar.style.background = 'rgba(10, 10, 18, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
}

// ===== 移动端菜单 =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('active');
        });
        
        // 点击链接后关闭菜单
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuBtn.classList.remove('active');
            });
        });
    }
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

// ===== 数字滚动动画 =====
function animateNumbers() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // 处理特殊格式（如百分比、货币符号、箭头）
                if (text.includes('%') || text.includes('$') || text.includes('→') || text.includes('年') || text.includes('品类')) {
                    // 不动画，直接显示
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

// ===== 视频卡片悬停效果 =====
function initVideoCards() {
    const videoCards = document.querySelectorAll('.video-card');
    
    videoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// ===== 统计卡片高亮效果 =====
function initStatCards() {
    const statCards = document.querySelectorAll('.stat-card');
    
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            statCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.6';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            statCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
}

// ===== 初始化所有功能 =====
function init() {
    try {
        createParticles();
        initCardFlip();
        initSkillTree();
        initNavbar();
        initMobileMenu();
        initSmoothScroll();
        animateNumbers();
        initPageLoad();
        initVideoCards();
        initStatCards();
        console.log('✅ Gemini 版本 - 所有功能初始化成功');
    } catch (error) {
        console.error('❌ 初始化错误:', error);
    }
}

// 等待 DOM 加载完成
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ===== 控制台彩蛋 =====
console.log(`
%c🎮 曹仁 - 游戏买量素材创意专家 %c🚀
%c欢迎访问我的个人简历网站！%c

💼 工作经验：8 年 + 游戏买量素材经验
🎯 擅长品类：SLG/MMO/MOBA/三消/卡牌
📊 核心业绩：T1 CTR 0.9% → 2.2%, CPI $10 → $1.6
🎨 全栈能力：AE/PR/UE/3D Max/AI 工具

有兴趣合作？联系我吧！
📱 18510980584
📧 932120004@qq.com
`, 
    'font-size: 20px; font-weight: bold; color: #00f0ff;',
    'font-size: 20px;',
    'color: #a0a0b0;',
    'color: #7000ff;'
);
