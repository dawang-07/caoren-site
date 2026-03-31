// ===== 弹窗功能 =====
function initModal() {
    const backdrop = document.getElementById('modalBackdrop');
    const dialog = document.getElementById('dialog-default');
    const cards = document.querySelectorAll('.quest-card');
    const modalContent = document.getElementById('modal-content');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-modal-target');
            const title = card.querySelector('h3.title').textContent;
            const content = modalContent.querySelector(`#${modalId}`).innerHTML;
            
            dialog.querySelector('.title').textContent = title;
            dialog.querySelector('.dialog-body').innerHTML = content;
            
            backdrop.classList.add('active');
            dialog.showModal();
        });
    });
    
    if (backdrop) {
        // 关闭按钮
        dialog.querySelector('button').addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
        
        // 点击背景关闭
        backdrop.addEventListener('click', (e) => {
            if (e.target === backdrop) {
                closeModal();
            }
        });

        // ESC 键
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
}

function closeModal() {
    const backdrop = document.getElementById('modalBackdrop');
    const dialog = document.getElementById('dialog-default');
    backdrop.classList.remove('active');
    dialog.close();
}

// ===== 初始化 =====
function init() {
    try {
        initModal();
        console.log('✅ Pixel RPG Adventure Initialized!');
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
%c
  /\_/\  
 ( o.o ) 
  > ^ <  
%c
Welcome to the Pixel RPG Adventure!

NAME: CAO REN
CLASS: 素材创意专家
LEVEL: 8

Ready to start?
`, 
'font-family: monospace; color: #f7d51d;',
'font-family: "Press Start 2P", monospace; color: #92cc47;'
);
