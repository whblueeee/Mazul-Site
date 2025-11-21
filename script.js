// ======================================================
// PARTE 0: ELEMENTOS DO HTML
// ======================================================
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const btnNo = document.getElementById('btn-no');
const modalFujao = document.getElementById('modal-fujao');
const btnFecharModal = document.getElementById('btn-fechar-modal');

let contadorTentativas = 0; 

// ======================================================
// PARTE 1: FUNÇÕES DO MODAL (POP-UP)
// ======================================================
function abrirModal() { 
    if(modalFujao) modalFujao.classList.add('show'); 
}

function fecharModal() { 
    if(modalFujao) modalFujao.classList.remove('show');
    resetarBotao(); 
}

if (btnFecharModal) btnFecharModal.addEventListener('click', fecharModal);
if (modalFujao) {
    modalFujao.addEventListener('click', (e) => {
        if (e.target === modalFujao) fecharModal();
    });
}

// ======================================================
// PARTE 2: MENU HAMBÚRGUER (MOBILE)
// ======================================================
if (menuIcon) {
    menuIcon.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        const icon = menuIcon.querySelector('i');
        if (icon.classList.contains('bx-menu')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });
}

// ======================================================
// PARTE 3: LÓGICA DO BOTÃO FUJÃO
// ======================================================

function resetarBotao() {
    btnNo.style.position = 'static'; 
    btnNo.style.transform = 'none';
    btnNo.style.left = '';
    btnNo.style.top = '';
    btnNo.style.zIndex = ''; 
    contadorTentativas = 0;
}

function moverBotao(e) {
    contadorTentativas++;
    
    if (contadorTentativas >= 7) {
        abrirModal();
        return; 
    }

    if (e && e.type === 'touchstart') {
        // e.preventDefault(); 
    }

    const w = window.innerWidth;
    const h = window.innerHeight;
    const btnW = btnNo.offsetWidth;
    const btnH = btnNo.offsetHeight;

    const maxLeft = w - btnW - 20;
    const maxTop = h - btnH - 20;
    const headerHeight = 100; 

    const newLeft = Math.max(20, Math.random() * maxLeft);
    const newTop = Math.max(headerHeight, Math.random() * maxTop);

    btnNo.style.position = 'fixed'; 
    btnNo.style.left = newLeft + 'px';
    btnNo.style.top = newTop + 'px';
    btnNo.style.zIndex = '3000'; 
    
    btnNo.style.transition = 'all 0.3s ease-out';
}

if (btnNo) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > window.innerHeight && btnNo.style.position === 'fixed') {
            resetarBotao();
        }
    });

    btnNo.addEventListener('mouseover', () => {
        if (window.innerWidth > 768) moverBotao();
    });

    btnNo.addEventListener('touchstart', (e) => {
        e.preventDefault(); 
        moverBotao(e);
    }, {passive: false});

    btnNo.addEventListener('click', (e) => {
        e.preventDefault();
        moverBotao(e);
    });
}

// ======================================================
// PARTE 4: INTERAÇÃO NO SCROLL (SOMENTE MOBILE)
// ======================================================

// MUDANÇA AQUI: Verificamos se a tela é pequena (Mobile/Tablet)
if (window.innerWidth <= 768) {
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.4 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Adiciona a classe que ativa o efeito visual
                entry.target.classList.add('mobile-effect');
            } else {
                // Remove para poder animar de novo quando passar
                entry.target.classList.remove('mobile-effect');
            }
        });
    }, observerOptions);

    // Seleciona os elementos e inicia a vigilância
    const elementsToAnimate = document.querySelectorAll('.main-photo, .floating-tag, .logo-img');
    elementsToAnimate.forEach(el => observer.observe(el));
}