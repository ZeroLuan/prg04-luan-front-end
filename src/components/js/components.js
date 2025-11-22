

// Função para carregar componentes HTML
async function loadComponent(componentPath, targetSelector) {
    try {
        const response = await fetch(componentPath);
        const html = await response.text();
        
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
            targetElement.innerHTML = html;
        }
    } catch (error) {
        console.error(`Erro ao carregar componente ${componentPath}:`, error);
    }
}

// Função para incluir header no início do body
async function includeHeader() {
    const header = await fetch('/src/components/header/header.html');
    const headerHTML = await header.text();
    
    // Insere o header no início do body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

// Função para incluir footer no final do body
async function includeFooter() {
    const footer = await fetch('/src/components/footer/footer.html');
    const footerHTML = await footer.text();
    
    // Insere o footer no final do body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Função genérica para processar elementos com atributo `data-include`
// Exemplo: <div data-include="../../../components/common/botao/botao-voltar.html"></div>
async function processIncludes() {
    const includeEls = document.querySelectorAll('[data-include]');
    await Promise.all(Array.from(includeEls).map(async (el) => {
        const path = el.getAttribute('data-include');
        if (!path) return;

        try {
            const res = await fetch(path);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            el.innerHTML = html;
        } catch (err) {
            console.error(`Erro ao incluir ${path}:`, err);
        }
    }));
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', async function() {
    // Processa placeholders `data-include` (permite que páginas escolham onde componentes específicos vão)
    await processIncludes();

    // Header e footer agora são incluídos diretamente no HTML das páginas principais
    // Não há mais inclusão automática via JavaScript
});