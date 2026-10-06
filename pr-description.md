# Release v0.5.0: Datepicker Glassmorphism & System UI Polish

## Descrição
Esta versão minor (v0.5.0) traz o novo e robusto Datepicker com estilo Glassmorphism, completo suporte a internacionalização, formatação de máscaras e limites de datas. Além disso, introduzimos um polimento visual importante nos botões, alinhando a profundidade e volumetria de todos eles ao padrão do Design System, além de melhorias de robustez e novas atualizações na documentação do Storybook.

## O que foi alterado
- **ct-datepicker**: Novo componente completo e customizado, suportando as propriedades `format` (DD/MM/YYYY, MM/DD/YYYY, YYYY/MM/DD), `locale`, `min`, e `max`. Conta com navegação intuitiva por dias, meses e anos.
- **ct-button**: Escurecimento do gradiente da variante primária para alto contraste, e implementação de efeitos de "profundidade" em todos os botões (Secondary, Tonal, Neon, Neumorph e Outline) padronizando o visual 3D Glass.
- **ct-sidebar**: Ajuste do border-radius dos itens de navegação para 8px.
- **ct-select**: Getter e setter seguros para a propriedade `options`, que faz o parse dinâmico de JSON previnindo erros ao receber dados nativos.
- **Storybook**: Atualização geral adicionando histórias para as novas propriedades do Datepicker, controles do Card (`glass`, `glowingCard`) e do Input (`autocomplete`).
- **Versionamento & Changelog**: Atualizações completas nos arquivos CHANGELOG, preparando a release v0.5.0.

## Tipo de PR
- [x] Nova Funcionalidade (`ct-datepicker` completo com novos fluxos)
- [x] Estilos/UI (melhoria visual profunda no `ct-button` e `ct-sidebar`)
- [x] Bugfix (correção no `ct-select`)
- [x] Docs (atualizações no `storybook` e `changelogs`)

## Checklist
- [x] Testes unitários passando
- [x] Build concluído com sucesso
- [x] Nenhuma alteração incompatível com versões anteriores (non-breaking)
