# 💸 CashTrack UI Design System

[![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub_Pages-success?logo=github)](https://renatomore.github.io/cashtrack-ui/)
[![NPM Version](https://img.shields.io/npm/v/cashtrack-ui?color=blue&logo=npm)](https://www.npmjs.com/package/cashtrack-ui)
[![Lit](https://img.shields.io/badge/Web_Components-Lit-324FFF?logo=lit)](https://lit.dev/)

**CashTrack UI** é um Design System moderno, focado no domínio financeiro, construído com **Web Components (Lit)**. Ele foi projetado para ser leve, extremamente rápido e agnóstico de framework, podendo ser integrado em projetos nativos Vanilla JS, React, Vue, Angular ou Svelte.

Conta com suporte nativo a **Dark Mode e Light Mode**, tipografia elegante baseada na fonte *Montserrat* e um visual contemporâneo (*Glassmorphism* em overlays).

---

## 🔗 Links Úteis

- 🌐 **[Showcase (Live Demo)](https://renatomore.github.io/cashtrack-ui/)**: Explore e interaja com os componentes renderizados na prática, além de consultar a documentação das propriedades em tempo real.
- 📚 **[Storybook](https://renatomore.github.io/cashtrack-ui/storybook/)**: Documentação técnica e isolada de todos os componentes com controles interativos.
- 📦 **[NPM Package](https://www.npmjs.com/package/cashtrack-ui)**: Acesso ao pacote publicado.

---

## ⚡ Instalação e Configuração

### 1. Adicionando ao Projeto
Instale a biblioteca via NPM no seu projeto consumidor:

```bash
npm install cashtrack-ui
```

### 2. Importação (React, Vue, Vite, etc.)
Importe os tokens globais (CSS) e os Web Components no ponto de entrada do seu App (ex: `main.ts` ou `App.tsx`):

```javascript
// Importa o Design System (Reset, Variáveis de Tema e Classes Base)
import 'cashtrack-ui/dist/style.css';

// Registra todos os Web Components no DOM
import 'cashtrack-ui';
```

### 3. Fontes e Ícones
Para garantir o design intencional, importe a tipografia **Montserrat** no arquivo `index.html` do seu projeto:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

## 🎨 Design Tokens e Temas

O **CashTrack UI** disponibiliza todas as suas cores e espaçamentos via **CSS Variables**. Isso facilita a customização no seu próprio app:

- `--ct-color-primary`: Cor primária (Ciano).
- `--ct-color-success`: Verde financeiro.
- `--ct-color-error`: Vermelho de despesa.
- `--ct-surface`: Cor de fundo dos cartões (Muda dinamicamente com o tema).
- `--ct-text-primary`: Cor principal do texto (Muda dinamicamente com o tema).

Para alternar entre **Light Mode** e **Dark Mode**, basta aplicar a classe `light-theme` ou `dark-theme` na tag `<body>` ou `:root` do seu projeto. A paleta se ajustará automaticamente.

---

## 🧱 Guia Rápido de Componentes

### Textos (`<ct-typography>`)
```html
<ct-typography variant="h1">Dashboard</ct-typography>
<ct-typography variant="body1" color="var(--ct-color-primary)">Saldo atualizado</ct-typography>
```

### Botões (`<ct-button>`)
```html
<ct-button variant="primary">Adicionar Dinheiro</ct-button>
<ct-button variant="outline" disabled>Não Permitido</ct-button>
```

### Entradas Monetárias (`<ct-currency-input>`)
```html
<ct-currency-input label="Valor (R$)" value="1500.75"></ct-currency-input>
```

### Cartões e Painéis (`<ct-card>`)
```html
<ct-card>
  <ct-typography variant="h3">Resumo Mensal</ct-typography>
  <ct-typography variant="h2" color="var(--ct-color-success)">R$ 15.300,00</ct-typography>
</ct-card>
```

*(Consulte o **Showcase** ou o **Storybook** para ver a lista completa de componentes, como Modais, Drawers, Sidebars e mais!)*

---

## 🛠 Desenvolvimento Local

Se você deseja rodar ou contribuir com o **CashTrack UI** localmente:

1. Clone o repositório.
2. Instale as dependências: `npm install`
3. Rode o servidor de Showcase: `npm run dev`
4. Rode o Storybook: `npm run storybook`
5. Execute os testes: `npm run test`

---

> **Nota para Integração com React (v18 ou inferior):** 
> O React clássico trata atributos complexos em Web Components como strings. Para repassar objetos (ex: `options` em um `<ct-select>`) ou ligar eventos customizados (`@ct-change`), você pode criar *wrappers* usando a biblioteca oficial `@lit/react` (`createComponent`). No **React 19+**, o suporte nativo a Custom Elements já é excelente.
