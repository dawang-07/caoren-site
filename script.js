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

// ===== 视频弹窗 =====
function initVideoModal() {
    const modal = document.getElementById('video-modal');
    const video = document.getElementById('modal-video');
    const closeBtn = document.querySelector('.modal-close');
    const projectCards = document.querySelectorAll('.project-card');

    // 示例视频 URL（实际使用时替换为你的视频）
    const videoSources = {
        video1: 'https://www.w3schools.com/html/mov_bbb.mp4',
        video2: 'https://www.w3schools.com/html/movie.mp4',
        video3: 'https://www.w3schools.com/html/mov_bbb.mp4',
        video4: 'https://www.w3schools.com/html/movie.mp4'
    };

    projectCards.forEach(card => {
        card.addEventListener('click', () => {
            const videoId = card.getAttribute('data-video');
            const videoSrc = videoSources[videoId];
            
            if (videoSrc) {
                video.src = videoSrc;
                modal.classList.add('active');
                video.play();
            }
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
        video.pause();
        video.src = '';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            video.pause();
            video.src = '';
        }
    });

    // ESC 键关闭
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            video.pause();
            video.src = '';
        }
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
            navbar.style.background = 'rgba(10, 10, 18, 0.9)';
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
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                
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
                
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

// ===== 鼠标跟随效果 =====
function initMouseFollow() {
    const cards = document.querySelectorAll('.project-card, .stat-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
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

// ===== 初始化所有功能 =====
function init() {
    createParticles();
    initCardFlip();
    initVideoModal();
    initSkillBars();
    initNavbar();
    initSmoothScroll();
    animateNumbers();
    initMouseFollow();
    initPageLoad();
}

// 启动
init();

// ===== 控制台彩蛋 =====
console.log(`
%c🎮 游戏买量专家简历 %c🚀
%c欢迎访问我的个人网站！%c

💼 工作经历：5 年 + 游戏买量经验
📊 累计投放：5 亿 +
🎯 成功案例：200+

有兴趣合作？联系我吧！
`, 
    'font-size: 20px; font-weight: bold; color: #00f0ff;',
    'font-size: 20px;',
    'color: #a0a0b0;',
    'color: #7000ff;'
);
