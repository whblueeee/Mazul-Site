const video = document.getElementById('intro-video');
const overlay = document.getElementById('intro-overlay');
const content = document.getElementById('main-content');

// 1. Quando o vídeo terminar ou após 4 segundos (caso o vídeo seja longo)
video.onended = function() {
    startFade();
};

// Fallback caso o vídeo demore a carregar
setTimeout(() => {
    if (overlay.style.display !== 'none') startFade();
}, 5000);

function startFade() {
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        content.classList.add('reveal');
    }, 1500); // Tempo do fade out
}

// 2. Lógica dos Modais
function openModal(id) {
    document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}