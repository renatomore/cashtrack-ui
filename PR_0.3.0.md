# PR: Release 0.3.0 - Melhorias no Light Mode, Documentação de Props e Integração Contínua (CI/CD)

## Descrição
Este Pull Request consolida a release 0.3.0 do `cashtrack-ui`. O foco desta entrega é garantir um modo claro (light mode) visualmente robusto e contrastante, enriquecer a documentação interativa com tabelas de propriedades detalhadas para cada componente, e fechar o ciclo de entrega contínua com a configuração de pipelines no GitHub Actions para publicação automatizada do pacote NPM e deploy da documentação no GitHub Pages.

---

## Features (Novas Funcionalidades)

### 📝 Documentação e Showcase
- **Tabelas de Propriedades**: Adição de uma função `_renderPropsTable` que renderiza dinamicamente as tabelas de documentação nas páginas dos componentes, informando tipo, valor padrão e descrição das propriedades aceitas.
- **Dicionário i18n**: Inclusão de chaves de tradução no `i18n.ts` para internacionalizar os cabeçalhos das tabelas de propriedades.

### 🔗 Navegação e Componentes
- **Acesso ao Storybook**: Link para o Storybook adicionado diretamente na barra lateral do Showcase.
- **Suporte a Links Externos**: O componente `ct-sidebar` e a interface `SidebarItem` agora aceitam a propriedade `external`, habilitando links externos automáticos com atributos `target="_blank"` e `rel="noopener noreferrer"`.

### 🛠 Tooling e Infraestrutura de CI/CD
- **Deploy no GitHub Pages**: Novo workflow `deploy-pages.yml` que executa o build consolidado do Showcase e do Storybook, os unifica na pasta `dist-showcase` (usando Vite e a CLI do Storybook via `npx`), e publica na branch nativa do GitHub Pages.
- **Configuração Customizada Vite**: Criação do arquivo `vite.showcase.config.ts` especificamente para o build do Showcase com o `base` path correto para o GitHub Pages (`/cashtrack-ui/`).
- **NPM Publish Workflow**: Atualização do `publish.yml` para disparar a publicação diretamente no NPM usando o `NODE_AUTH_TOKEN`.
- **Ignorados Corretamente**: Adicionados os diretórios `coverage` e `dist-showcase` no `.gitignore` para evitar poluição do repositório.

---

## Fixes (Correções)

- **Modo Claro "Apagado"**: Resolução de problemas de contraste no light mode substituindo valores mágicos de cores e opacidades soltas (`#FFFFFF`) por variáveis dinâmicas de tema (como `--ct-overlay-hover` e `--ct-text-primary`) em todos os componentes visuais.
- **Transparência de Superfície**: Aumento da opacidade base das superfícies de painéis (`ct-card`, `ct-modal`, `ct-drawer`) de `0.7` para `0.9` no modo claro, melhorando significativamente a legibilidade.
- **Dimming Dinâmico (Backdrop)**: Implementação da nova variável CSS `--ct-backdrop`, permitindo que o escurecimento do fundo ao abrir overlays possua intensidades diferentes no modo claro e escuro.
- **Textos Invisíveis**: Correção de bug no `ct-input` onde textos e ícones podiam sumir durante a digitação por possuírem a cor fixa em branco independente do tema atual.
- **Sintaxe do Storybook no CI**: Correção da passagem de parâmetros da CLI (`-- -o`) no `package.json` utilizando o comando nativo `npx storybook build -o` no workflow, resolvendo o bug de argumentos do NPM na etapa de build do Storybook.

---

## Breaking Changes (Alterações Quebrantes)
- Nenhuma alteração quebra a compatibilidade com versões anteriores da API pública da biblioteca ou altera contratos existentes.
