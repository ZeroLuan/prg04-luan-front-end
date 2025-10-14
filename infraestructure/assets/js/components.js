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
    const header = await fetch('../components/header/header.html');
    const headerHTML = await header.text();
    
    // Insere o header no início do body
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

// Função para incluir footer no final do body
async function includeFooter() {
    const footer = await fetch('../components/footer/footer.html');
    const footerHTML = await footer.text();
    
    // Insere o footer no final do body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

// Executa quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', async function() {
    await includeHeader();
    await includeFooter();
});