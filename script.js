// ======================================================
// PARTE 0: PEGAR ELEMENTOS DO HTML
// ======================================================
const menuIcon = document.getElementById('menu-icon');
const navMenu = document.getElementById('nav-menu');
const btnNo = document.getElementById('btn-no');
// NOVOS ELEMENTOS DO MODAL:
const modalFujao = document.getElementById('modal-fujao');
const btnFecharModal = document.getElementById('btn-fechar-modal');

let contadorTentativas = 0; 

// ======================================================
// PARTE 1: FUNÇÕES DO MODAL (NOVO)
// ======================================================
function abrirModal() {
    // Mostra o modal adicionando a classe 'show' do CSS
    modalFujao.classList.add('show');
}

function fecharModal() {
    // Esconde o modal removendo a classe 'show'
    modalFujao.classList.remove('show');
    // Reseta o botão fujão pro lugar dele
    resetarBotao();
}

// Conecta o clique do botão de fechar do modal
btnFecharModal.addEventListener('click', fecharModal);

// Opcional: Fechar se clicar no fundo escuro fora da caixinha
modalFujao.addEventListener('click', (e) => {
    if (e.target === modalFujao) {
        fecharModal();
    }
});


// ======================================================
// PARTE 2: MENU HAMBÚRGUER (Padrão)
// ======================================================
menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    const icon = menuIcon.querySelector('i');
    if(icon.classList.contains('bx-menu')){
        icon.classList.remove('bx-menu');
        icon.classList.add('bx-x');
    } else {
        icon.classList.remove('bx-x');
        icon.classList.add('bx-menu');
    }
});


// ======================================================
// PARTE 3: LÓGICA DO BOTÃO FUJÃO (Atualizada com Modal)
// ======================================================

// --- Função para Resetar o Botão ---
function resetarBotao() {
    btnNo.style.position = 'static';
    btnNo.style.left = '';
    btnNo.style.top = '';
    btnNo.style.transform = '';
    btnNo.style.zIndex = '';
    contadorTentativas = 0;
}

// --- Função Principal de Movimento ---
function moverBotao(e) {
    contadorTentativas++;

    // REGRA DAS 5 TENTATIVAS (MUDAMOS AQUI!)
    if (contadorTentativas >= 8) {
        // EM VEZ DE ALERT, CHAMAMOS NOSSO MODAL BONITO:
        abrirModal(); 
        
        return; // Para a função aqui. O reset acontece quando fechar o modal.
    }

    if (e && e.type === 'touchstart') e.preventDefault();

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = btnNo.offsetWidth;
    const btnHeight = btnNo.offsetHeight;

    const maxLeft = windowWidth - btnWidth - 20;
    const maxTop = windowHeight - btnHeight - 20;

    const newLeft = Math.max(20, Math.random() * maxLeft);
    const newTop = Math.max(20, Math.random() * maxTop);

    btnNo.style.position = 'fixed';
    btnNo.style.left = newLeft + 'px';
    btnNo.style.top = newTop + 'px';
    btnNo.style.zIndex = '1000';
}

// ======================================================
// EVENTOS
// ======================================================

// 1. Evento de Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight && btnNo.style.position === 'fixed') {
        resetarBotao();
    }
});

// 2. Evento Mouse Over (PC)
btnNo.addEventListener('mouseover', () => {
    if (window.innerWidth > 768) {
        moverBotao();
    }
});

// 3. Evento Clique (Mobile e Ninja de PC)
btnNo.addEventListener('click', (e) => {
    if (window.innerWidth <= 768) {
        e.preventDefault();
        moverBotao(e);
    } else {
        // Se alguém clicar no PC antes das 5 tentativas
        // Aqui ainda podemos usar um alert simples ou criar outro modal
        alert("Você é rápido hein? Clica no azul! 😉");
        resetarBotao();
    }
});