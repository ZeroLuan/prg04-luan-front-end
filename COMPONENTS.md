# 📋 Como Usar os Componentes

## 🏗️ Estrutura dos Componentes

Os componentes estão organizados na pasta `infraestructure/components/`:

```
components/
├── header/
│   └── header.html
├── footer/
│   └── footer.html
└── navigation/
```

## 🔧 Como Incluir os Componentes

### Método 1: JavaScript (Atual)

Já está configurado no `index.html`. O arquivo `components.js` carrega automaticamente:

```javascript
// Inclui header e footer automaticamente
document.addEventListener("DOMContentLoaded", async function () {
  await includeHeader();
  await includeFooter();
});
```

### Método 2: Fetch Manual

Para páginas específicas, você pode usar:

```javascript
// Carregar header
loadComponent("../components/header/header.html", "#header-container");

// Carregar footer
loadComponent("../components/footer/footer.html", "#footer-container");
```

### Método 3: Server-Side Include (Para projetos com servidor)

```html
<!--#include file="../components/header/header.html" -->
<main>
  <!-- Conteúdo da página -->
</main>
<!--#include file="../components/footer/footer.html" -->
```

## ✅ Vantagens desta Abordagem

1. **Reutilização**: Mesmo header/footer em todas as páginas
2. **Manutenção**: Alterações em um local apenas
3. **Organização**: Código modular e limpo
4. **Escalabilidade**: Fácil migração para frameworks
5. **Performance**: Carregamento otimizado

## 🎯 Próximos Passos

1. Criar componentes para navegação
2. Implementar sistema de templates
3. Adicionar componentes reutilizáveis (cards, botões, etc.)
4. Considerar migração para framework (React, Vue, Angular)

## 📁 Estrutura Recomendada para Novos Componentes

```
components/
├── header/
│   ├── header.html
│   ├── header.css
│   └── header.js
├── footer/
│   ├── footer.html
│   ├── footer.css
│   └── footer.js
├── navigation/
│   ├── nav.html
│   ├── nav.css
│   └── nav.js
└── cards/
    ├── service-card.html
    ├── service-card.css
    └── service-card.js
```
