# Changelog

Todas as alterações notáveis a este projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/pt-BR/1.1.0/),
e este projeto adere ao [Semantic Versioning](https://semver.org/lang/pt-BR/).

## [0.4.0] - 2026-10-01

### Adicionado
- `ct-card`: Adicionada nova propriedade `glowingCard` que aplica um efeito de brilho dourado ao card.
- Showcase: Botão de menu hamburger adicionado ao header para navegação responsiva em telas mobile.
- Docs: O arquivo `README.md` foi internacionalizado, incluindo versões em Inglês (EN-US) e Português (BR), além de links para o Showcase e Repositório do GitHub.

## [0.3.2] - 2026-09-30

### Corrigido
- Showcase: Resolvido problema de erro 404 no carregamento do `changelog.json` no GitHub Pages através do uso de caminho relativo ao `BASE_URL`.

## [0.3.1] - 2026-09-30

### Corrigido
- Componente `ct-sidebar` não sofre mais crashes ou erros de map quando a propriedade `items` recebe valores em string ou primitivos, graças a um parser inteligente e estrito de array.

## [0.3.0] - 2026-09-30

### Adicionado
- Documentação do Showcase agora inclui uma **Tabela de Propriedades** em cada página de componente, listando todas as props públicas com tipo, valor padrão e descrição.
- Link do Storybook adicionado ao menu lateral para acesso rápido ao explorador interativo de componentes.
- Nova variável CSS `--ct-backdrop` para controle de escurecimento de overlays por tema.
- `ct-sidebar` agora suporta a propriedade `external` em itens de navegação, habilitando links externos com `target="_blank"`.

### Alterado
- O modo claro recebeu uma reformulação visual completa: aumento da opacidade da superfície de `0.7` para `0.9` e substituição de todos os valores fixos `#FFFFFF` / `rgba(255,255,255,...)` por variáveis CSS dinâmicas nos componentes `ct-sidebar`, `ct-input`, `ct-drawer`, `ct-alert`, `ct-transaction-item` e `ct-card`.
- Overlays de backdrop (`ct-modal`, `ct-drawer`, `ct-sidebar` mobile) agora utilizam a variável `--ct-backdrop`, proporcionando um efeito de escurecimento mais suave no modo claro.

### Corrigido
- Superfícies do Modal e Drawer com aparência "apagada" no modo claro devido a fundos brancos de baixa opacidade compostos com backdrops escuros.
- Texto invisível no modo claro do `ct-input` (cor do texto estava fixada em branco).
- Estados de hover em itens do sidebar, botões de fechar e linhas de transação agora utilizam `--ct-overlay-hover` para contraste adequado em ambos os temas.

## [0.2.0] - 2026-09-29

### Adicionado
- Suporte a internacionalização (i18n) com dicionários em Português e Inglês.
- Seletor de idioma interativo na documentação do Showcase.
- Suporte nativo para renderização de mídias (`icon` e `image`) dentro das opções do `ct-select`.
- Pipeline de CI/CD utilizando GitHub Actions e Changesets para automatizar publicação no NPM.
- Script automatizado para geração de `changelog.json` unificado durante o build e push.

### Corrigido
- Elementos flutuantes (`ct-modal`, `ct-drawer`, `ct-alert`) renderizando corretamente ao evitar conflitos de `position: fixed` causados por pais com `backdrop-filter`.
- Alinhamento vertical do `ct-select` quando renderizado sem um rótulo.

## [0.1.0] - 2026-09-29

### Adicionado
- Setup inicial do repositório utilizando Vite, Lit e TypeScript.
- Configuração do Design System em Web Components puros para máxima compatibilidade.
- Componentes de tipografia e botões: `ct-typography`, `ct-button`.
- Componentes de informação visual: `ct-badge`, `ct-icon`, `ct-card`.
- Componentes flutuantes (Overlays): `ct-alert`, `ct-drawer`, `ct-modal`.
- Componentes de formulário: `ct-input`, `ct-currency-input`, `ct-select`.
- Componentes complexos / blocos: `ct-sidebar`, `ct-transaction-item`.
- Integração profunda do Storybook 8.x para documentação interativa em UI.
- Configuração de testes unitários utilizando Vitest, JSDOM, e \`@open-wc/testing\`.
- Cobertura de testes unitários atingindo 100% de linhas, statements e funções.
- Configuração nativa de Workspace do Vitest para integrar os testes com a UI interativa do Storybook.
