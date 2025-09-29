# PRG04-LUAN-FRONT-END

Este projeto foi estruturado para organizar os arquivos de forma clara e escalável, pensando em boas práticas que facilitam a manutenção e futura evolução para frameworks modernos como **React** ou **Vue.js**.

---

## Estrutura de Pastas

### 📂 `infraestructure`

Contém os arquivos globais e recursos compartilhados do projeto.

* **assets/**: Diretório principal de recursos.

  * **css/global/**: Arquivos de estilo globais que podem ser reutilizados em várias páginas.
  * **fonts/**: Fontes personalizadas usadas no projeto.
  * **images/**: Imagens de uso geral do site (exemplo: `globo.ico`).
  * **js/**: Scripts JavaScript de uso global.
* **pages/**: Páginas principais e públicas do projeto.

  * **about/** e **contact/**: Diretórios dedicados a páginas específicas.
  * **atividade-3.html**: Página referente a uma atividade prática.
  * **index.html**: Página inicial do projeto.

---

### 📂 `usuario`

Diretório que representa uma **área de usuário**, isolando os arquivos relacionados a funcionalidades específicas.

* **assets/**: Recursos específicos da área de usuário.

  * **css/**: Estilos exclusivos da parte de usuário.
  * **images/**: Imagens próprias dessa seção.
  * **js/**: Scripts focados em funcionalidades do usuário.
* **pages/**: Páginas referentes à área do usuário.
* **components/**: Componentes reutilizáveis (botões, cards, formulários, etc.).

---

## Vantagens da Arquitetura

✔ **Organização clara**: separa o que é global do que é específico do usuário.
✔ **Escalabilidade**: fácil adaptação para frameworks modernos (React, Vue.js, Angular).
✔ **Reuso**: os diretórios `assets` e `components` incentivam a reutilização de código.
✔ **Manutenção simplificada**: facilita encontrar e atualizar arquivos específicos.

---

## Próximos Passos

* Criar um padrão de nomenclatura consistente para arquivos CSS e JS.
* Estruturar os **components** de forma modular para futura migração para React ou Vue.
* Documentar dependências externas (bibliotecas, frameworks, etc.) conforme forem adicionadas.

---

📌 Este `README.md` serve como guia inicial para entender a organização do projeto e facilitar contribuições futuras.
