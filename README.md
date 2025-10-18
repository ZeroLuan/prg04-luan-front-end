# PRG04-LUAN-FRONT-END

Projeto front-end estático organizado para facilitar manutenção, reuso de componentes e futura migração para frameworks como React/Vue.

Principais objetivos:

- Organização clara dos recursos (assets, components, pages);
- Facilitar a inclusão de header/footer reutilizáveis;
- Documentação simples para desenvolvedores e colaboradores.

## Como ver o projeto localmente

Você pode abrir as páginas diretamente no navegador (ex.: `src/pages/index.html`), porém algumas funcionalidades de include por fetch podem precisar de um servidor estático. Uma opção rápida com Python (PowerShell):

```powershell
python -m http.server 8000
# depois abra http://localhost:8000/src/pages/index.html
```

Ou use qualquer servidor estático de sua preferência (Live Server, http-server, etc.).

## Estrutura resumida

Nota: este projeto separa recursos por responsabilidade. Exemplo simplificado:

- `src/assets/` — imagens, fontes e CSS globais
- `src/components/` — header, footer e outros componentes reutilizáveis
- `src/pages/` — páginas públicas (index, atividades, administrador, etc.)
- `src/components/common/` — pequenos componentes reutilizáveis (botões, inputs)

Exemplo (trecho):

```
src/
  assets/
    css/global/
  components/
    header/
    footer/
    common/
  pages/
    index.html
    atividades/
```

## Convenções e boas práticas

- Nomeie arquivos CSS/JS relacionados a um componente com o prefixo do componente (ex.: `header.css`, `header.js`).
- Mantenha estilos globais em `assets/css/global/` e evite regras muito específicas lá.
- Componentes devem ser autônomos: HTML + (opcional) CSS + (opcional) JS.

## Inclusão de componentes

O projeto já possui um loader simples de componentes em `src/components/js/components.js` que faz include do header e footer automaticamente ao carregar a página. Consulte `COMPONENTS.md` para exemplos de uso (fetch, include via JS e SSI).

## Próximos passos sugeridos

1. Padronizar a nomenclatura de arquivos e classes CSS (BEM ou outra convenção).
2. Criar testes visuais ou snapshots para componentes importantes.
3. Adicionar um pequeno script de build (opcional) para minificação/concatenação.

## Como contribuir

- Abra um branch com nome claro (`feature/nome-da-funcionalidade`)
- Faça commits pequenos e descritivos
- Adicione descrições nos PRs explicando o propósito das mudanças

Obrigado — qualquer dúvida sobre a estrutura, posso documentar mais exemplos de componentes e flows.
