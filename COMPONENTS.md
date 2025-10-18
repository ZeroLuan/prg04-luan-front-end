# 📋 Como usar os componentes (atualizado)

Este arquivo descreve como os componentes do projeto estão organizados e como incluí‑los em páginas estáticas.

## Estrutura e local dos componentes

No projeto, os componentes ficam em `src/components/` e normalmente cada componente tem:

- `component-name.html` — marcação do componente
- `component-name.css` (opcional) — estilos locais
- `component-name.js` (opcional) — comportamento específico

Exemplo mínimo:

```
src/components/
  header/
    header.html
    header.css
    header.js
  footer/
    footer.html
```

## Métodos para incluir componentes

1. Loader em JavaScript (recomendado para sites estáticos)

O projeto já contém um loader simples em `src/components/js/components.js` que insere header e footer automaticamente ao carregar a página. Padrão de uso:

```javascript
// components.js (exemplo)
async function loadComponent(url, selector) {
  const res = await fetch(url);
  if (!res.ok) throw new Error("Falha ao carregar " + url);
  const html = await res.text();
  document.querySelector(selector).innerHTML = html;
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadComponent(
    "/src/components/header/header.html",
    "#header-container"
  );
  await loadComponent(
    "/src/components/footer/footer.html",
    "#footer-container"
  );
});
```

Use caminhos relativos conforme a estrutura da sua página.

2. Fetch manual (quando quiser carregar componentes sob demanda)

```javascript
// carregar apenas quando necessário
loadComponent("/src/components/navigation/nav.html", "#nav");
```

