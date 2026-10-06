# PR: Exportação Automática de CSS e Classes Responsivas no Grid

## Descrição
Esta versão patch (0.6.1) introduz a exportação explícita do arquivo `style.css` pelo `package.json` e o auto-import no ponto de entrada `index.ts`. Essa correção garante que todos os design tokens, variáveis e estilos globais do sistema de design sejam importados automaticamente pelos bundlers dos projetos consumidores, sem a necessidade de inclusão manual extra. Além disso, foram incluídas classes responsivas do tipo `lg:col-span-*` no sistema de grid, permitindo um controle melhor do layout em telas médias-grandes.

---

## Features (Novas Funcionalidades)

### 📱 Sistema de Grid Responsivo
- **Classes `lg:col-span-*`**: Adicionada uma nova media query para o breakpoint de 1024px (`max-width: 1024px`), suportando todas as 12 colunas da grid. Isso provê flexibilidade na construção de layouts fluidos antes do breakpoint de tablet.

---

## Fixes (Correções)
- **Build e Exportação de Estilos**: Inclusão de `./dist/index.css` no campo `exports` do `package.json` e da instrução `import './style.css'` no `src/index.ts`. O projeto consumidor não precisa mais resolver os estilos do Design System separadamente, simplificando a adoção da biblioteca.

---

## Breaking Changes (Alterações Quebrantes)
- Nenhuma alteração quebra a compatibilidade com versões anteriores da API pública da biblioteca ou altera contratos existentes.
