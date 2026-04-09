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

function calculateTotal() {
    const selectedPlan = document.querySelector('input[name="base_plan"]:checked');
    if (!selectedPlan) return;

    let baseValue = parseFloat(selectedPlan.value);
    let planName = selectedPlan.getAttribute('data-name');
    
    // REGRA: Se houver plano fixo (baseValue > 0), ativa o desconto de 15%
    let temPlanoAtivo = baseValue > 0;

    let itemsTotal = 0;
    let itemsCount = 0;
    const inputs = document.querySelectorAll('.qty-input');
    
    inputs.forEach(input => {
        let price = parseFloat(input.getAttribute('data-price'));
        let qty = parseInt(input.value) || 0;
        if(qty > 0) {
            itemsTotal += (price * qty);
            itemsCount += qty;
        }
    });

    // APLICA O DESCONTO APENAS NOS ITENS EXTRAS
    let valorExtras = itemsTotal;
    if (temPlanoAtivo) {
        valorExtras = itemsTotal * 0.85; // Tira 15%
    }

    const totalFinal = baseValue + valorExtras;

    // ATUALIZA O TOTAL NA TELA
    document.getElementById('total-display').innerText = totalFinal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    
    // ATUALIZA O TEXTO DO RESUMO
    let resumo = temPlanoAtivo ? planName : "Modelo On-Demand";
    if(itemsCount > 0) resumo += ` + ${itemsCount} item(ns) extra(s)`;
    document.getElementById('summary-text').innerText = resumo;

    // MOSTRA/ESCONDE O AVISO VERDE DE DESCONTO
    const aviso = document.getElementById('desconto-aviso');
    if (aviso) {
        // Só mostra se tiver plano selecionado E algum item extra adicionado
        aviso.style.display = (temPlanoAtivo && itemsCount > 0) ? 'block' : 'none';
    }
}

function sendToWhatsApp() {
    const total = document.getElementById('total-display').innerText;
    const resumo = document.getElementById('summary-text').innerText;
    const numero = "55XXXXXXXXXXX"; // COLOQUE SEU NÚMERO AQUI
    const texto = `Olá! Realizei uma simulação de orçamento no site:%0A%0A*Modelo:* ${resumo}%0A*Investimento Estimado:* ${total}`;
    
    window.open(`https://wa.me/${numero}?text=${texto}`, '_blank');
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.querySelector('input[name="base_plan"]')) {
        calculateTotal();
    }
});

function abrirTabelaAvulsa() {
    // 1. Abre o modal de serviços
    openModal('modal-servicos');

    // 2. Garante que a opção "Sem Plano" (valor 0) esteja marcada
    const radioAvulso = document.querySelector('input[name="base_plan"][value="0"]');
    if (radioAvulso) {
        radioAvulso.checked = true;
    }

    // 3. Reseta as quantidades para 0 (evita lixo de seleções anteriores)
    const inputs = document.querySelectorAll('.qty-input');
    inputs.forEach(input => {
        input.value = 0;
    });

    // 4. Força o cálculo para o rodapé exibir R$ 0,00 e o texto correto
    calculateTotal();
}