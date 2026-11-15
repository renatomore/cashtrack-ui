# PR: Classes Responsivas no Grid, Exportação de CSS e Ajustes de Tema Dourado

## Descrição
Este Pull Request introduz melhorias e correções na versão 0.6.1 do CashTrack UI. As alterações incluem novas classes utilitárias responsivas (`lg:col-span-*`) no sistema de grid, exportação e importação automáticas do arquivo de estilos globais `style.css` no pacote distribuído, redefinição da paleta de cores primárias para o tom dourado moeda (`#9c8555`) sobre superfícies neutras, e ajustes de navegação e tipografia no showcase.

---

## Features (Novas Funcionalidades)

### 📱 Sistema de Grid
- **Classes Responsivas `lg:col-span-*`**: Adicionada media query para telas até 1024px no `src/style.css`, expandindo o controle responsivo do grid de 12 colunas para layouts intermediários.

### 🎨 Tema e Design System
- **Paleta Dourado Moeda**: Atualização global das variáveis e gradientes de destaque para o dourado `#9c8555`, combinando com superfícies em cinza escuro neutro (`#121212`).

---

## Fixes (Correções)

### 📦 Build e Distribuição
- **Exportação Automática de CSS**: Inclusão de `./dist/index.css` no campo `exports` do `package.json` e auto-import em `src/index.ts`, garantindo que estilos e tokens globais sejam incluídos automaticamente em aplicações consumidoras.

### 🧭 Showcase e Navegação
- **Diferenciação no Menu Lateral**: Renomeação do item em Design Tokens para `Tokens de Tipografia` mantendo `Typography` em Componentes no `src/i18n.ts` e `src/main.ts`.
- **Roteamento por ID**: Ajuste no evento de navegação da `src/main.ts` para resolver rotas preferencialmente por `id` em vez de rótulo, evitando conflitos entre páginas homônimas.
- **Tipagem na Tabela de Props**: Atualizada a propriedade `variant` de `ct-typography` na documentação para refletir a escala T-Shirt (`xs` a `4xl`).

---

## Breaking Changes (Alterações Quebrantes)
- Nenhuma alteração quebra a compatibilidade com versões anteriores da API pública da biblioteca ou altera contratos existentes.
