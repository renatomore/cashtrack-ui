# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2026-10-01

### Added
- `ct-card`: Adicionada nova propriedade `glowingCard` que aplica um efeito dourado brilhante no card.
- Showcase: Adicionado botão de menu hambúrguer no cabeçalho para navegação responsiva em telas mobile.
- Docs: O arquivo `README.md` foi internacionalizado, incluindo versões em Inglês (EN-US) e Português (BR), juntamente com links para o Showcase e Repositório do GitHub.

## [0.3.2] - 2026-09-30

### Fixed
- Showcase: Resolved 404 error when loading `changelog.json` on GitHub Pages by using a path relative to `BASE_URL`.

## [0.3.1] - 2026-09-30

### Fixed
- `ct-sidebar` component no longer crashes or throws map errors when the `items` property receives stringified values or primitives, thanks to a smart and strict array parser.

## [0.3.0] - 2026-09-30

### Added
- Showcase documentation now includes a **Properties Table** in every component page, listing all public props with their type, default value, and description.
- Storybook link added to the sidebar menu for quick access to the interactive component explorer.
- New CSS variable `--ct-backdrop` for controlling overlay dimming per theme.
- `ct-sidebar` now supports `external` property on nav items, enabling external links with `target="_blank"`.

### Changed
- Light mode received a comprehensive visual overhaul: increased surface opacity from `0.7` to `0.9` and replaced all hardcoded `#FFFFFF` / `rgba(255,255,255,...)` values with theme-aware CSS variables across `ct-sidebar`, `ct-input`, `ct-drawer`, `ct-alert`, `ct-transaction-item`, and `ct-card`.
- Backdrop overlays (`ct-modal`, `ct-drawer`, `ct-sidebar` mobile) now use the `--ct-backdrop` variable, providing a lighter dimming effect in light mode and avoiding the "washed out" appearance.

### Fixed
- Modal and Drawer surfaces looking "faded" in light mode due to low-opacity white backgrounds compositing with dark backdrops.
- Input text invisible in light mode (`ct-input` text color was hardcoded white).
- Hover states on sidebar items, close buttons, and transaction rows now use `--ct-overlay-hover` for proper contrast in both themes.

## [0.2.0] - 2026-09-29

### Added
- Internationalization (i18n) support with Portuguese and English dictionaries.
- Language selector dropdown in the Showcase documentation.
- Support for `icon` and `image` media rendering inside `ct-select` options.
- CI/CD pipeline using GitHub Actions and Changesets to automate NPM publishing.
- Automated script to generate unified `changelog.json` on build and push.

### Fixed
- Overlay elements (`ct-modal`, `ct-drawer`, `ct-alert`) rendering correctly outside of `backdrop-filter` parents to fix `position: fixed` stacking context issues.
- `ct-select` vertical alignment issue when rendered without a label.

## [0.1.0] - 2026-09-29

### Added
- Initial repository setup using Vite, Lit, and TypeScript.
- Design System configuration in pure Web Components for maximum compatibility.
- Typography and button components: `ct-typography`, `ct-button`.
- Visual information components: `ct-badge`, `ct-icon`, `ct-card`.
- Overlay components: `ct-alert`, `ct-drawer`, `ct-modal`.
- Form components: `ct-input`, `ct-currency-input`, `ct-select`.
- Complex/block components: `ct-sidebar`, `ct-transaction-item`.
- Deep integration with Storybook 8.x for interactive UI documentation.
- Unit testing setup using Vitest, JSDOM, and \`@open-wc/testing\`.
- Unit test coverage reaching 100% of lines, statements, and functions.
- Native Vitest Workspace configuration to integrate tests with Storybook's interactive UI.
