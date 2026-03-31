// ===== 粒子效果 =====
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 100;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: rgba(0, 240, 255, ${Math.random() * 0.5 + 0.3});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(0, 240, 255, 0.8);
        `;
        particlesContainer.appendChild(particle);
    }
}

// 添加浮动动画
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== 卡片翻转 =====
function initCardFlip() {
    const cards = document.querySelectorAll('.card-3d');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
}

// ===== 技能条动画 =====
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const percent = entry.target.getAttribute('data-percent');
                entry.target.style.width = percent + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));
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
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const text = target.textContent;
                
                // 处理特殊格式（如百分比、货币符号）
                if (text.includes('%') || text.includes('$') || text.includes('→')) {
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

    statNumbers.forEach(num => observer.observe(num));
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

// ===== 初始化所有功能 =====
function init() {
    try {
        createParticles();
        initCardFlip();
        initSkillBars();
        initNavbar();
        initSmoothScroll();
        animateNumbers();
        initPageLoad();
        console.log('✅ 所有功能初始化成功');
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
