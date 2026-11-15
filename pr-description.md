# PR: Refinamento de Tema Dourado e Navegação do Showcase (v0.6.2)

## Descrição
Este Pull Request introduz melhorias visuais e correções na versão 0.6.2 do CashTrack UI. As alterações compreendem o reajuste da paleta de cores primárias para um tom de dourado fosco (`#9c8555`) estilo moeda sobre superfícies em cinza neutro, a resolução de conflitos de navegação no menu lateral do showcase (diferenciando os tokens de tipografia do componente `ct-typography`), a restauração da acentuação nos changelogs e a atualização da tabela de propriedades com a escala T-Shirt.

---

## Features (Novas Funcionalidades)

### 🎨 Tema e Design System
- **Paleta Dourado Moeda**: Redefinição das variáveis de cor primária, sombras de neon e gradientes para a cor `#9c8555`, conferindo um visual sofisticado e metálico ao design system.
- **Superfícies Neutras**: Ajuste das superfícies e fundos escuros para cinza neutro (`#121212`), aumentando o contraste com o dourado.

---

## Fixes (Correções)

### 🧭 Showcase e Navegação
- **Diferenciação no Menu Lateral**: Renomeação do item em Design Tokens para `Tokens de Tipografia` (em inglês: `Typography Tokens`) mantendo `Typography` em Componentes no `src/i18n.ts` e `src/main.ts`.
- **Roteamento Seguro por ID**: O manipulador de navegação agora busca itens primariamente por `id`, evitando ambiguidades e colisões entre rotas homônimas.
- **Tipos de Variantes na Documentação**: Atualização da documentação da propriedade `variant` de `ct-typography` para a escala T-Shirt (`xs` a `4xl`).

### 📝 Documentação e Acentuação
- **Codificação UTF-8**: Correção de caracteres especiais e acentos nos arquivos de changelog em português (`CHANGELOG.pt-BR.md`).

---

## Breaking Changes (Alterações Quebrantes)
- Nenhuma alteração quebra a compatibilidade com versões anteriores da API pública da biblioteca ou altera contratos existentes.
