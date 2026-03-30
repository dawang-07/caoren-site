// ========== 像素风简历网站交互脚本 ==========

// 等待 DOM 加载完成
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== 像素光标跟随 =====
    const cursor = document.querySelector('.cursor');
    
    if (cursor && window.innerWidth > 768) {
        document.addEventListener('mousemove', function(e) {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });
        
        // 点击效果
        document.addEventListener('click', function(e) {
            createClickEffect(e.clientX, e.clientY);
        });
    }
    
    // ===== 点击像素粒子效果 =====
    function createClickEffect(x, y) {
        const colors = ['#00e436', '#59a9ff', '#ff6b9d', '#ffd700'];
        
        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 9999;
                image-rendering: pixelated;
            `;
            
            document.body.appendChild(particle);
            
            const angle = (i / 8) * Math.PI * 2;
            const velocity = 5;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            animateParticle(particle, vx, vy);
        }
    }
    
    function animateParticle(particle, vx, vy) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let opacity = 1;
        
        function update() {
            x += vx;
            y += vy + 0.5; // 重力
            opacity -= 0.02;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(update);
            } else {
                particle.remove();
            }
        }
        
        update();
    }
    
    // ===== 加载动画 =====
    const loading = document.getElementById('loading');
    const mainContent = document.getElementById('main-content');
    
    if (loading && mainContent) {
        setTimeout(function() {
            loading.style.opacity = '0';
            setTimeout(function() {
                loading.style.display = 'none';
                mainContent.style.display = 'block';
                animateTimelineItems();
            }, 500);
        }, 2000);
    }
    
    // ===== 时间线项目动画 =====
    function animateTimelineItems() {
        const items = document.querySelectorAll('.timeline-item');
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const content = entry.target.querySelector('.timeline-content');
                    if (content) {
                        content.style.animationPlayState = 'running';
                    }
                }
            });
        }, { threshold: 0.3 });
        
        items.forEach(function(item) {
            observer.observe(item);
        });
    }
    
    // ===== 创建闪烁星星背景 =====
    createStars();
    
    function createStars() {
        const starsContainer = document.createElement('div');
        starsContainer.className = 'stars';
        
        for (let i = 0; i < 50; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.animationDelay = Math.random() * 2 + 's';
            starsContainer.appendChild(star);
        }
        
        document.body.insertBefore(starsContainer, document.body.firstChild);
    }
    
    // ===== 标题打字机效果 =====
    const title = document.querySelector('.pixel-title');
    if (title) {
        const text = title.textContent;
        title.textContent = '';
        title.style.display = 'inline-block';
        
        let i = 0;
        function typeWriter() {
            if (i < text.length) {
                title.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            }
        }
        
        setTimeout(typeWriter, 2500);
    }
    
    // ===== 技能条动画（如果有） =====
    function animateSkillBars() {
        const bars = document.querySelectorAll('.skill-progress');
        
        bars.forEach(function(bar) {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(function() {
                bar.style.width = width;
            }, 300);
        });
    }
    
    // ===== 滚动动画 =====
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', function() {
        const currentScrollY = window.scrollY;
        
        // 视差效果
        const parallaxElements = document.querySelectorAll('.pixel-border');
        parallaxElements.forEach(function(el) {
            const speed = 0.1;
            const yPos = (currentScrollY - el.offsetTop) * speed;
            if (yPos < 50 && yPos > -50) {
                el.style.transform = 'translateY(' + yPos + 'px)';
            }
        });
        
        lastScrollY = currentScrollY;
    });
    
    // ===== 按钮悬停音效（可选） =====
    const buttons = document.querySelectorAll('.pixel-btn, .pixel-tag');
    
    buttons.forEach(function(btn) {
        btn.addEventListener('mouseenter', function() {
            // 可以添加音效
            console.log('Hover effect triggered');
        });
    });
    
    // ===== 控制台彩蛋 =====
    console.log('%c🎮 欢迎来到曹仁的像素风简历网站！', 'color: #00e436; font-size: 16px; font-weight: bold; font-family: "Press Start 2P", cursive;');
    console.log('%c👾 Made with Pixel Love', 'color: #59a9ff; font-size: 12px;');
    console.log('%c📧 联系：932120004@qq.com', 'color: #ff6b9d; font-size: 10px;');
    
    // ===== 键盘快捷键 =====
    document.addEventListener('keydown', function(e) {
        // 按 C 显示/隐藏光标
        if (e.key === 'c' || e.key === 'C') {
            if (cursor) {
                cursor.style.display = cursor.style.display === 'none' ? 'block' : 'none';
            }
        }
        
        // 按 S 切换星星背景
        if (e.key === 's' || e.key === 'S') {
            const stars = document.querySelector('.stars');
            if (stars) {
                stars.style.display = stars.style.display === 'none' ? 'block' : 'none';
            }
        }
        
        // 按 H 返回首页顶部
        if (e.key === 'h' || e.key === 'H') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // ===== 平滑滚动到锚点 =====
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== 性能优化：节流滚动事件 =====
    function throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function(...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime < delay) {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    lastExecTime = currentTime;
                    func.apply(this, args);
                }, delay);
            } else {
                lastExecTime = currentTime;
                func.apply(this, args);
            }
        };
    }
    
    // ===== 移动端优化 =====
    if (window.innerWidth <= 768) {
        // 移动设备上禁用自定义光标
        if (cursor) {
            cursor.style.display = 'none';
        }
        
        // 简化动画
        document.body.style.setProperty('--animation-speed', '0.5');
    }
    
    // ===== 页面可见性变化时暂停动画 =====
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });
    
    // ===== 添加加载完成类 =====
    setTimeout(function() {
        document.body.classList.add('loaded');
    }, 100);
    
});

// ===== 全局工具函数 =====

// 随机数生成
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// 像素化效果
function pixelate(element, size) {
    element.style.imageRendering = 'pixelated';
    element.style.width = size + 'px';
    element.style.height = size + 'px';
}

// 颜色渐变动画
function animateColor(element, colors, duration) {
    let index = 0;
    
    setInterval(function() {
        element.style.color = colors[index];
        element.style.borderColor = colors[index];
        index = (index + 1) % colors.length;
    }, duration);
}

// ===== Service Worker 注册（可选，用于离线访问） =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // 可以注册 service worker 用于离线缓存
        // navigator.serviceWorker.register('/sw.js');
    });
}

// ===== 性能监控 =====
window.addEventListener('load', function() {
    const timing = performance.timing;
    const loadTime = timing.loadEventEnd - timing.navigationStart;
    console.log(`📊 页面加载时间：${loadTime}ms`);
});

// ===== 错误处理 =====
window.addEventListener('error', function(e) {
    console.error('❌ 页面错误:', e.message);
    // 可以在这里添加错误报告逻辑
});

// ===== 防抖函数 =====
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// ===== 窗口大小变化时重新计算 =====
window.addEventListener('resize', debounce(function() {
    if (window.innerWidth <= 768) {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.style.display = 'none';
    } else {
        const cursor = document.querySelector('.cursor');
        if (cursor) cursor.style.display = 'block';
    }
}, 250));

console.log('✅ 像素风简历脚本加载完成');
