# PR: Adição de Menu Mobile no Showcase e Internacionalização do README

## Descrição
Este Pull Request foca em melhorias de acessibilidade no nosso site de documentação (Showcase) e na estruturação do repositório para o público externo. Foi implementado um botão de navegação mobile garantindo usabilidade em telas pequenas para interagir com a `ct-sidebar`, além de uma grande revisão no `README.md`, que agora conta com tradução completa para Inglês (EN-US) e links diretos para a documentação e repositório. O pacote também foi atualizado para preparar a release 0.4.0.

---

## Features (Novas Funcionalidades)

### 📦 Documentação e Repositório
- **README Bilíngue**: O `README.md` foi totalmente reescrito para suportar de forma nativa os idiomas Inglês (EN-US) e Português (BR).
- **Links Essenciais**: Adição dos links oficiais do repositório (`https://github.com/renatomore/cashtrack-ui`) e da documentação/showcase (`https://renatomore.github.io/cashtrack-ui/`) no cabeçalho do README para facilitar o acesso de novos usuários.

### 📱 Showcase Responsivo
- **Botão Hambúrguer**: Introdução de um botão com ícone de menu no cabeçalho do `cashtrack-showcase`. Este botão fica visível apenas na versão mobile (viewports abaixo de 768px) e permite a abertura correta do menu lateral da `ct-sidebar`.

---

## Fixes (Correções)
- **Erro 404 no GitHub Pages**: Correção do caminho de carregamento do `changelog.json` no Showcase, que antes causava erros quando hospedado em subdiretórios no GitHub Pages (presente desde o patch 0.3.2).

---

## Breaking Changes (Alterações Quebrantes)
- Nenhuma alteração quebra a compatibilidade com versões anteriores da API pública da biblioteca ou altera contratos existentes.
