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

function updateDots() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function moveSlide(direction) {
    const track = document.getElementById('carouselTrack');
    const cards = document.querySelectorAll('.carousel-card');
    const totalSlides = cards.length;

    currentSlide += direction;

    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }

    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
}

// Função para clicar direto no pontinho
function currentSlideTo(index) {
    const track = document.getElementById('carouselTrack');
    currentSlide = index;
    const offset = -currentSlide * 100;
    track.style.transform = `translateX(${offset}%)`;
    updateDots();
}