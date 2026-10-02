# CashTrack UI

**Choose your language / Escolha seu idioma:**
- [English (US)](#english-us)
- [Português (BR)](#português-br)

---

## English (US)

CashTrack UI is a premium Design System built with **Web Components (Lit)**, designed to be lightweight, incredibly fast, and framework-agnostic. It can be consumed in React, Vue, Angular, Svelte projects, or purely with HTML/JS.

📖 **Documentation / Showcase:** [https://renatomore.github.io/cashtrack-ui/](https://renatomore.github.io/cashtrack-ui/)
💻 **Repository:** [https://github.com/renatomore/cashtrack-ui](https://github.com/renatomore/cashtrack-ui)

The default typography of the project uses **Montserrat**. The entire interface supports and automatically applies **Dark Mode / Light Mode** color schemes.

---

### ⚡ Installation

#### Using in a Vite project (React, Vue, Vanilla)

1. Install the package in your consumer project:

```bash
npm install cashtrack-ui
```

2. Import the Global CSS and register the Web Components in your app's main file (e.g., `main.ts` or `App.tsx`):

```javascript
// Imports the base Design Tokens and Reset
import 'cashtrack-ui/dist/style.css';

// Imports the Web Components (all of them)
import 'cashtrack-ui';
```

3. Make sure to import the Montserrat font in your `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### 🧱 Components

#### Typography (`<ct-typography>`)
Used to standardize all texts and hierarchies in the application.
- **`variant`**: `h1` | `h2` | `h3` | `body1` | `body2` | `caption`
- **`color`**: String (CSS Color)

```html
<ct-typography variant="h1">Overview</ct-typography>
<ct-typography variant="body1" color="var(--text-secondary)">
  Track your income and expenses.
</ct-typography>
```

#### Button (`<ct-button>`)
Primary button for interactions and form submissions.
- **`variant`**: `primary` | `secondary` | `outline` 
- **`disabled`**: Boolean

```html
<ct-button variant="primary">Add Transaction</ct-button>
<ct-button variant="outline" disabled>Action Unavailable</ct-button>
```

#### Badge (`<ct-badge>`)
Small identification tags or statuses.
- **`variant`**: `success` | `error` | `warning` | `info` | `default`

```html
<ct-badge variant="success">+ Income</ct-badge>
<ct-badge variant="error">- Expense</ct-badge>
```

#### Card (`<ct-card>`)
Floating layout container for summaries and charts. The Card encapsulates content in the Slot and applies theme shadows/colors.

```html
<ct-card>
  <ct-typography variant="h3">Current Balance</ct-typography>
  <ct-typography variant="h2" color="#4CAF50">$ 15,300.00</ct-typography>
</ct-card>
```

#### Input (`<ct-input>`)
Standardized floating text input field.
- **`label`**: String
- **`type`**: `text` | `password` | `email` | etc.
- **`value`**: String
- **`error`**: String (Renders red message if present)
- **`disabled`**: Boolean
- **Events**: `@ct-change`

```html
<ct-input 
  label="Transaction Name" 
  value="Supermarket">
</ct-input>
```

#### Currency Input (`<ct-currency-input>`)
Specialized field that forces the user to type only monetary values. Visually formats to local currency while passing clean `Number` values through `@ct-change` events.
- **`label`**: String
- **`value`**: Number
- **`error`**: String
- **`disabled`**: Boolean
- **Events**: `@ct-change`

```html
<ct-currency-input label="Amount ($)" value="1250.50"></ct-currency-input>
```

#### Select (`<ct-select>`)
Custom option selection dropdown.
- **`label`**: String
- **`value`**: String
- **`options`**: Array<{ label: String, value: String }>
- **Events**: `@ct-change`

```html
<!-- (Remember that in frameworks like React/Lit you can pass complex objects via .options properties) -->
<ct-select label="Category" value="food"></ct-select>
```

#### Icon (`<ct-icon>`)
Component for loading SVGs or font icons.
- **`name`**: String
- **`size`**: String
- **`color`**: String

```html
<ct-icon name="dashboard" size="24px" color="#00E5FF"></ct-icon>
```

---

### 🛠 Overlays

#### Modal (`<ct-modal>`)
Pop-up fixed in the center of the screen containing a blur backdrop.
- **`open`**: Boolean
- **`disableBackdropClick`**: Boolean
- **Events**: `@ct-close`
- **Slots**: `title`, `(default)`, `footer`

```html
<ct-modal open>
  <span slot="title">Confirm Action</span>
  <p>Are you sure you want to delete this transaction?</p>
  <ct-button slot="footer" variant="outline">Cancel</ct-button>
  <ct-button slot="footer" variant="primary">Delete</ct-button>
</ct-modal>
```

#### Drawer (`<ct-drawer>`)
Side panel that slides over the content for contextual actions.
- **`open`**: Boolean
- **`position`**: `left` | `right`
- **Events**: `@ct-close`

```html
<ct-drawer open position="right">
  <h2>Filters</h2>
</ct-drawer>
```

#### Alert (`<ct-alert>`)
Toasts or footer notifications.
- **`variant`**: `success` | `error` | `warning` | `info`
- **`position`**: `left` | `center` | `right`
- **`open`**: Boolean
- **Events**: `@ct-close`
- **Slots**: `(default)`

```html
<ct-alert variant="success" open position="right">
  Transaction saved successfully!
</ct-alert>
```

---

### 🧩 Complex Blocks

#### Sidebar (`<ct-sidebar>`)
Main application navigation sidebar, containing links and icons.
- **`mobileOpen`**: Boolean
- **`items`**: Array<{ label, href, icon }>

#### Transaction Item (`<ct-transaction-item>`)
Visual block to render a CashTrack transactional event.
- **`type`**: `income` | `expense`
- **`amount`**: Number
- **`category`**: String
- **`date`**: String
- **Slots**: `(default / title)`

```html
<ct-transaction-item type="expense" amount="150.75" category="Food" date="12 Oct 2026">
  Supermarket
</ct-transaction-item>
```

---

### 🎨 Design Tokens

The global CSS variables provided in `style.css` are available for you to use in your App.

- `--ct-color-primary`: #00E5FF
- `--ct-color-success`: #4CAF50
- `--ct-color-error`: #F44336
- `--ct-surface`: #1E1E1E (Dark) / #FFFFFF (Light)
- `--ct-text-primary`: #FFFFFF (Dark) / #000000 (Light)

> **Note for React Integration:** 
> Classic React (prior to 19) treats strict attributes on Web Components as strings or requires refs. To pass objects (`options`, `items`) reactively and seamlessly or bind custom events like `@ct-change`, you can use libraries like `@lit/react` (createComponent) in pure React projects.

---
---

## Português (BR)

CashTrack UI é um Design System construído com **Web Components (Lit)**, projetado para ser leve, incrivelmente rápido e agnóstico de framework. Ele pode ser consumido em projetos React, Vue, Angular, Svelte ou puramente com HTML/JS.

📖 **Documentação / Showcase:** [https://renatomore.github.io/cashtrack-ui/](https://renatomore.github.io/cashtrack-ui/)
💻 **Repositório:** [https://github.com/renatomore/cashtrack-ui](https://github.com/renatomore/cashtrack-ui)

A tipografia padrão do projeto utiliza **Montserrat**. Toda a interface suporta e aplica automaticamente os esquemas de cores **Dark Mode / Light Mode**.

---

### ⚡ Instalação

#### Usando em um projeto Vite (React, Vue, Vanilla)

1. Instale o pacote no seu projeto consumidor:

```bash
npm install cashtrack-ui
```

2. Importe o CSS Global e registre os Web Components no arquivo principal do seu App (ex: `main.ts` ou `App.tsx`):

```javascript
// Importa o arquivo base de Design Tokens e Reset
import 'cashtrack-ui/dist/style.css';

// Importa os Web Components (todos)
import 'cashtrack-ui';
```

3. Certifique-se de importar a fonte Montserrat no seu `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap" rel="stylesheet">
```

---

### 🧱 Componentes

#### Typography (`<ct-typography>`)
Utilizado para padronizar todos os textos e hierarquias da aplicação.
- **`variant`**: `h1` | `h2` | `h3` | `body1` | `body2` | `caption`
- **`color`**: String (CSS Color)

```html
<ct-typography variant="h1">Visão Geral</ct-typography>
<ct-typography variant="body1" color="var(--text-secondary)">
  Acompanhe seus rendimentos e gastos.
</ct-typography>
```

#### Button (`<ct-button>`)
Botão primário para interações e submissão de formulários.
- **`variant`**: `primary` | `secondary` | `outline` 
- **`disabled`**: Boolean

```html
<ct-button variant="primary">Adicionar Transação</ct-button>
<ct-button variant="outline" disabled>Ação Indisponível</ct-button>
```

#### Badge (`<ct-badge>`)
Pequenas tags de identificação ou status.
- **`variant`**: `success` | `error` | `warning` | `info` | `default`

```html
<ct-badge variant="success">+ Receita</ct-badge>
<ct-badge variant="error">- Despesa</ct-badge>
```

#### Card (`<ct-card>`)
Container de layout flutuante para resumos e gráficos. O Card encapsula o conteúdo no Slot e aplica sombras/cores do tema.

```html
<ct-card>
  <ct-typography variant="h3">Saldo Atual</ct-typography>
  <ct-typography variant="h2" color="#4CAF50">R$ 15.300,00</ct-typography>
</ct-card>
```

#### Input (`<ct-input>`)
Campo de entrada de texto padronizado flutuante.
- **`label`**: String
- **`type`**: `text` | `password` | `email` | etc.
- **`value`**: String
- **`error`**: String (Renderiza mensagem vermelha se presente)
- **`disabled`**: Boolean
- **Eventos**: `@ct-change`

```html
<ct-input 
  label="Nome da Transação" 
  value="Supermercado">
</ct-input>
```

#### Currency Input (`<ct-currency-input>`)
Campo especializado que força o usuário a digitar apenas valores monetários. Formata visualmente para `BRL (R$)` enquanto repassa eventos `@ct-change` com valores `Number` limpos.
- **`label`**: String
- **`value`**: Number
- **`error`**: String
- **`disabled`**: Boolean
- **Eventos**: `@ct-change`

```html
<ct-currency-input label="Valor (R$)" value="1250.50"></ct-currency-input>
```

#### Select (`<ct-select>`)
Dropdown customizado de seleção de opções.
- **`label`**: String
- **`value`**: String
- **`options`**: Array<{ label: String, value: String }>
- **Eventos**: `@ct-change`

```html
<!-- (Lembre-se que em frameworks como React/Lit você pode passar objetos complexos via propriedades .options) -->
<ct-select label="Categoria" value="food"></ct-select>
```

#### Icon (`<ct-icon>`)
Componente para carregar SVGs.
- **`name`**: String
- **`size`**: String
- **`color`**: String

```html
<ct-icon name="dashboard" size="24px" color="#00E5FF"></ct-icon>
```

---

### 🛠 Overlays

#### Modal (`<ct-modal>`)
Pop-up fixado no centro da tela e contendo backdrop de blur.
- **`open`**: Boolean
- **`disableBackdropClick`**: Boolean
- **Eventos**: `@ct-close`
- **Slots**: `title`, `(default)`, `footer`

```html
<ct-modal open>
  <span slot="title">Confirmar Ação</span>
  <p>Tem certeza que deseja excluir esta transação?</p>
  <ct-button slot="footer" variant="outline">Cancelar</ct-button>
  <ct-button slot="footer" variant="primary">Excluir</ct-button>
</ct-modal>
```

#### Drawer (`<ct-drawer>`)
Painel lateral que desliza sobre o conteúdo para ações em contexto.
- **`open`**: Boolean
- **`position`**: `left` | `right`
- **Eventos**: `@ct-close`

```html
<ct-drawer open position="right">
  <h2>Filtros</h2>
</ct-drawer>
```

#### Alert (`<ct-alert>`)
Toasts ou Notificações de rodapé.
- **`variant`**: `success` | `error` | `warning` | `info`
- **`position`**: `left` | `center` | `right`
- **`open`**: Boolean
- **Eventos**: `@ct-close`
- **Slots**: `(default)`

```html
<ct-alert variant="success" open position="right">
  Transação salva com sucesso!
</ct-alert>
```

---

### 🧩 Complex Blocks

#### Sidebar (`<ct-sidebar>`)
Menu lateral de navegação principal da aplicação, contendo links e ícones.
- **`mobileOpen`**: Boolean
- **`items`**: Array<{ label, href, icon }>

#### Transaction Item (`<ct-transaction-item>`)
Bloco visual para renderizar um evento transacional do CashTrack.
- **`type`**: `income` | `expense`
- **`amount`**: Number
- **`category`**: String
- **`date`**: String
- **Slots**: `(default / título)`

```html
<ct-transaction-item type="expense" amount="150.75" category="Alimentação" date="12 Out 2026">
  Supermercado
</ct-transaction-item>
```

---

### 🎨 Design Tokens

As variáveis CSS globais fornecidas em `style.css` estão disponíveis para você usar no seu App. 

- `--ct-color-primary`: #00E5FF
- `--ct-color-success`: #4CAF50
- `--ct-color-error`: #F44336
- `--ct-surface`: #1E1E1E (Dark) / #FFFFFF (Light)
- `--ct-text-primary`: #FFFFFF (Dark) / #000000 (Light)

> **Nota para Integração em React:** 
> O React clássico (anterior ao 19) trata atributos estritos em Web Components como strings ou necessita de refs. Para passar objetos (`options`, `items`) de forma reativa e sem fricção ou ligar eventos customizados como `@ct-change`, você pode utilizar bibliotecas como o `@lit/react` (createComponent) em projetos puramente React.
