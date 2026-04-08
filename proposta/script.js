const video = document.getElementById('intro-video');
const overlay = document.getElementById('intro-overlay');
const content = document.getElementById('main-content');

// --- 1. LÓGICA DA INTRO (VÍDEO) ---

video.onended = function() {
    startFade();
};

setTimeout(() => {
    if (overlay.style.display !== 'none') startFade();
}, 5000);

function startFade() {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        content.classList.add('reveal');
    }, 1500); 
}

// --- 2. LÓGICA DOS MODAIS (ROLAGEM NO OVERLAY) ---

function openModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'flex';
    
    // Trava o scroll da página de fundo
    document.body.style.overflow = 'hidden';
    
    // Faz o scroll do modal (overlay) ir para o topo
    modal.scrollTop = 0;
}

function closeModal(id) {
    const modal = document.getElementById(id);
    modal.style.display = 'none';
    
    // Devolve o scroll para a página
    document.body.style.overflow = 'auto';
}

// Fechar ao clicar na área escura (overlay)
// Como o overlay agora tem scroll, o clique deve ser validado cuidadosamente
window.onclick = function(event) {
    if (event.target.classList.contains('modal-overlay')) {
        event.target.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
};

// Fechar ao apertar a tecla 'Esc'
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const modals = document.querySelectorAll('.modal-overlay');
        modals.forEach(modal => {
            if (modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
});

let currentSlide = 0;

function updateCarouselUI() {
    const track = document.getElementById('carouselTrack');
    const dots = document.querySelectorAll('.dot');
    const tabs = document.querySelectorAll('.tab-item');
    const cards = document.querySelectorAll('.carousel-card');

    if (currentSlide < 0) currentSlide = cards.length - 1;
    if (currentSlide >= cards.length) currentSlide = 0;

    // Move o carrossel
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Atualiza Dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });

    // Atualiza Abas
    tabs.forEach((tab, index) => {
        tab.classList.toggle('active', index === currentSlide);
    });
}

function moveSlide(direction) {
    currentSlide += direction;
    updateCarouselUI();
}

function currentSlideTo(index) {
    currentSlide = index;
    updateCarouselUI();
}