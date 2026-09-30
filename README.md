# CashTrack UI

CashTrack UI é um Design System construído com **Web Components (Lit)**, projetado para ser leve, incrivelmente rápido e agnóstico de framework. Ele pode ser consumido em projetos React, Vue, Angular, Svelte ou puramente com HTML/JS.

A tipografia padrão do projeto utiliza **Montserrat**. Toda a interface suporta e aplica automaticamente os esquemas de cores **Dark Mode / Light Mode**.

---

## ⚡ Instalação

### Usando em um projeto Vite (React, Vue, Vanilla)

1. Instale o pacote no seu projeto consumidor (quando publicado) ou instale localmente apontando para este repositório:

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

## 🧱 Componentes

### Typography (`<ct-typography>`)
Utilizado para padronizar todos os textos e hierarquias da aplicação.
- **`variant`**: `h1` | `h2` | `h3` | `body1` | `body2` | `caption`
- **`color`**: String (CSS Color)

```html
<ct-typography variant="h1">Visão Geral</ct-typography>
<ct-typography variant="body1" color="var(--text-secondary)">
  Acompanhe seus rendimentos e gastos.
</ct-typography>
```

### Button (`<ct-button>`)
Botão primário para interações e submissão de formulários.
- **`variant`**: `primary` | `secondary` | `outline` 
- **`disabled`**: Boolean

```html
<ct-button variant="primary">Adicionar Transação</ct-button>
<ct-button variant="outline" disabled>Ação Indisponível</ct-button>
```

### Badge (`<ct-badge>`)
Pequenas tags de identificação ou status.
- **`variant`**: `success` | `error` | `warning` | `info` | `default`

```html
<ct-badge variant="success">+ Receita</ct-badge>
<ct-badge variant="error">- Despesa</ct-badge>
```

### Card (`<ct-card>`)
Container de layout flutuante para resumos e gráficos. O Card encapsula o conteúdo no Slot e aplica sombras/cores do tema.

```html
<ct-card>
  <ct-typography variant="h3">Saldo Atual</ct-typography>
  <ct-typography variant="h2" color="#4CAF50">R$ 15.300,00</ct-typography>
</ct-card>
```

### Input (`<ct-input>`)
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

### Currency Input (`<ct-currency-input>`)
Campo especializado que força o usuário a digitar apenas valores monetários. Formata visualmente para `BRL (R$)` enquanto repassa eventos `@ct-change` com valores `Number` limpos.
- **`label`**: String
- **`value`**: Number
- **`error`**: String
- **`disabled`**: Boolean
- **Eventos**: `@ct-change`

```html
<ct-currency-input label="Valor (R$)" value="1250.50"></ct-currency-input>
```

### Select (`<ct-select>`)
Dropdown customizado de seleção de opções.
- **`label`**: String
- **`value`**: String
- **`options`**: Array<{ label: String, value: String }>
- **Eventos**: `@ct-change`

```html
<!-- (Lembre-se que em frameworks como React/Lit você pode passar objetos complexos via propriedades .options) -->
<ct-select label="Categoria" value="food"></ct-select>
```

### Icon (`<ct-icon>`)
Componente para carregar SVGs.
- **`name`**: String
- **`size`**: String
- **`color`**: String

```html
<ct-icon name="dashboard" size="24px" color="#00E5FF"></ct-icon>
```

---

## 🛠 Overlays

### Modal (`<ct-modal>`)
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

### Drawer (`<ct-drawer>`)
Painel lateral que desliza sobre o conteúdo para ações em contexto.
- **`open`**: Boolean
- **`position`**: `left` | `right`
- **Eventos**: `@ct-close`

```html
<ct-drawer open position="right">
  <h2>Filtros</h2>
</ct-drawer>
```

### Alert (`<ct-alert>`)
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

## 🧩 Complex Blocks

### Sidebar (`<ct-sidebar>`)
Menu lateral de navegação principal da aplicação, contendo links e ícones.
- **`mobileOpen`**: Boolean
- **`items`**: Array<{ label, href, icon }>

### Transaction Item (`<ct-transaction-item>`)
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

## 🎨 Design Tokens

As variáveis CSS globais fornecidas em \`style.css\` estão disponíveis para você usar no seu App. 

- \`--ct-color-primary\`: #00E5FF
- \`--ct-color-success\`: #4CAF50
- \`--ct-color-error\`: #F44336
- \`--ct-surface\`: #1E1E1E (Dark) / #FFFFFF (Light)
- \`--ct-text-primary\`: #FFFFFF (Dark) / #000000 (Light)

> **Nota para Integração em React:** 
> O React clássico (anterior ao 19) trata atributos estritos em Web Components como strings ou necessita de refs. Para passar objetos (`options`, `items`) de forma reativa e sem fricção ou ligar eventos customizados como `@ct-change`, você pode utilizar bibliotecas como o `@lit/react` (createComponent) em projetos puramente React.
