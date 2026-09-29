import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './style.css';
import './components/ct-typography';
import './components/ct-button';
import './components/ct-badge';
import './components/ct-card';
import './components/ct-input';
import './components/ct-currency-input';
import './components/ct-select';
import './components/ct-icon';
import './components/ct-modal';
import './components/ct-drawer';
import './components/ct-alert';
import './components/ct-sidebar';
import './components/ct-transaction-item';

@customElement('cashtrack-showcase')
export class CashtrackShowcase extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @state() private activeRoute = 'Button';
  @state() private isModalOpen = false;
  @state() private isDrawerOpen = false;
  @state() private isAlertOpen = false;
  @state() private currentTheme = 'dark';

  @state() private sidebarItems = [
    { label: 'Button', icon: 'smart_button', active: true },
    { label: 'Typography', icon: 'text_fields' },
    { label: 'Card', icon: 'space_dashboard' },
    { label: 'Input & Currency', icon: 'input' },
    { label: 'Select', icon: 'arrow_drop_down_circle' },
    { label: 'Modal', icon: 'picture_in_picture' },
    { label: 'Drawer', icon: 'vertical_split' },
    { label: 'Alert', icon: 'warning' },
    { label: 'Transaction Item', icon: 'receipt_long' },
    { label: 'Badge', icon: 'label' }
  ];

  private _handleNavigation(e: CustomEvent) {
    this.activeRoute = e.detail.label;
    this.sidebarItems = this.sidebarItems.map(item => ({
      ...item,
      active: item.label === this.activeRoute
    }));
  }

  private _toggleTheme() {
    const root = document.documentElement;
    if (this.currentTheme === 'dark') {
      root.setAttribute('data-theme', 'light');
      this.currentTheme = 'light';
    } else {
      root.removeAttribute('data-theme');
      this.currentTheme = 'dark';
    }
  }

  private renderDocSection() {
    switch (this.activeRoute) {
      case 'Button':
        return html`
          <ct-typography variant="h1">Button</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            O componente Button é usado para interações do usuário. Possui diversas variantes estilizadas de acordo com a hierarquia de ação.
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <ct-typography variant="h3" style="margin-bottom: 16px;">Variantes Disponíveis</ct-typography>
            
            <div style="display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px;">
              <ct-button variant="primary">Primary</ct-button>
              <ct-button variant="secondary">Secondary (Pure Glass)</ct-button>
              <ct-button variant="tonal">Tonal Glass</ct-button>
              <ct-button variant="neon">Cyber Neon Glow</ct-button>
              <ct-button variant="neumorph">Dark Neumorph</ct-button>
              <ct-button variant="outline">Outline</ct-button>
              <ct-button variant="text">Text</ct-button>
            </div>
          </ct-card>
        `;

      case 'Typography':
        return html`
          <ct-typography variant="h1">Typography</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            O componente Typography gerencia a exibição de textos mantendo a consistência do Design System (Fonte Montserrat).
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
              <ct-typography variant="h1">Heading 1 (2.5rem)</ct-typography>
              <ct-typography variant="h2">Heading 2 (2rem)</ct-typography>
              <ct-typography variant="h3">Heading 3 (1.75rem)</ct-typography>
              <ct-typography variant="body1">Body 1 (1rem) - Default text element</ct-typography>
              <ct-typography variant="caption">Caption (0.875rem)</ct-typography>
            </div>
            <pre class="code-block"><code>&lt;ct-typography variant="h1"&gt;Heading 1&lt;/ct-typography&gt;
&lt;ct-typography variant="body1" color="var(--ct-color-primary)"&gt;Custom Color&lt;/ct-typography&gt;</code></pre>
          </ct-card>
        `;

      case 'Card':
        return html`
          <ct-typography variant="h1">Card</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            Cards são containers vitrificados usados para agrupar informações relacionadas.
          </ct-typography>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
            <ct-card>
              <ct-typography variant="h3">Standard Card</ct-typography>
              <ct-typography variant="body1" color="var(--ct-text-secondary)">Conteúdo padrão do card.</ct-typography>
            </ct-card>
            <ct-card class="card-gold-glow">
              <ct-typography variant="h3" class="text-gold">Glowing Card</ct-typography>
              <ct-typography variant="body1" color="var(--ct-text-secondary)">Usando o helper class .card-gold-glow.</ct-typography>
            </ct-card>
          </div>
          <ct-card>
            <pre class="code-block"><code>&lt;ct-card&gt;
  &lt;ct-typography variant="h3"&gt;Title&lt;/ct-typography&gt;
&lt;/ct-card&gt;</code></pre>
          </ct-card>
        `;

      case 'Input & Currency':
        return html`
          <ct-typography variant="h1">Inputs</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            Campos de formulário padronizados. O Currency Input aplica máscaras de formatação BRL automaticamente.
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; max-width: 400px;">
              <ct-input label="Nome Completo" placeholder="Digite seu nome"></ct-input>
              <ct-input label="E-mail" type="email" error="E-mail inválido"></ct-input>
              <ct-currency-input label="Valor (R$)" placeholder="R$ 0,00"></ct-currency-input>
            </div>
            <pre class="code-block"><code>&lt;ct-input label="Nome"&gt;&lt;/ct-input&gt;
&lt;ct-input label="E-mail" error="E-mail inválido"&gt;&lt;/ct-input&gt;
&lt;ct-currency-input label="Valor"&gt;&lt;/ct-currency-input&gt;</code></pre>
          </ct-card>
        `;

      case 'Select':
        return html`
          <ct-typography variant="h1">Select</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            Dropdown customizado com suporte a objetos complexos.
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="margin-bottom: 24px; max-width: 400px;">
              <ct-select 
                label="Categoria" 
                .options="${[{label: 'Alimentação', value: 'food'}, {label: 'Salário', value: 'salary'}]}">
              </ct-select>
            </div>
            <pre class="code-block"><code>&lt;ct-select 
  label="Categoria" 
  .options="\${[{label: 'Item', value: '1'}]}"&gt;
&lt;/ct-select&gt;</code></pre>
          </ct-card>
        `;

      case 'Modal':
        return html`
          <ct-typography variant="h1">Modal</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            Diálogos sobrepostos para foco exclusivo em tarefas.
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <ct-button variant="primary" @click="${() => this.isModalOpen = true}" style="margin-bottom: 24px;">Abrir Modal</ct-button>
            <pre class="code-block"><code>&lt;ct-modal ?open="\${this.isOpen}" @ct-close="\${this.close}"&gt;
  &lt;span slot="title"&gt;Título&lt;/span&gt;
  &lt;p&gt;Conteúdo&lt;/p&gt;
  &lt;ct-button slot="footer"&gt;Ação&lt;/ct-button&gt;
&lt;/ct-modal&gt;</code></pre>
          </ct-card>
          <ct-modal ?open="${this.isModalOpen}" @ct-close="${() => this.isModalOpen = false}">
            <span slot="title">Exemplo de Modal</span>
            <ct-typography variant="body1">Este é o conteúdo do modal.</ct-typography>
            <ct-button slot="footer" variant="outline" @click="${() => this.isModalOpen = false}">Fechar</ct-button>
          </ct-modal>
        `;

      case 'Drawer':
        return html`
          <ct-typography variant="h1">Drawer</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            Painel deslizante (geralmente usado para filtros ou menus mobile).
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <ct-button variant="primary" @click="${() => this.isDrawerOpen = true}" style="margin-bottom: 24px;">Abrir Filtros</ct-button>
            <pre class="code-block"><code>&lt;ct-drawer ?open="\${this.isOpen}" position="right"&gt;
  &lt;p&gt;Filtros&lt;/p&gt;
&lt;/ct-drawer&gt;</code></pre>
          </ct-card>
          <ct-drawer ?open="${this.isDrawerOpen}" position="right" @ct-close="${() => this.isDrawerOpen = false}">
            <ct-typography variant="h2">Filtros</ct-typography>
            <ct-typography variant="body1">Conteúdo do drawer.</ct-typography>
          </ct-drawer>
        `;

      case 'Alert':
        return html`
          <ct-typography variant="h1">Alert</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            Notificações flutuantes temporárias (Toasts).
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
              <ct-button variant="primary" @click="${() => { this.isAlertOpen = true; setTimeout(() => this.isAlertOpen = false, 3000); }}">Disparar Success Alert</ct-button>
            </div>
            <pre class="code-block"><code>&lt;ct-alert ?open="\${this.isOpen}" variant="success" position="right"&gt;
  Sucesso!
&lt;/ct-alert&gt;</code></pre>
          </ct-card>
          <ct-alert ?open="${this.isAlertOpen}" variant="success" position="right" @ct-close="${() => this.isAlertOpen = false}">
            Operação realizada com sucesso!
          </ct-alert>
        `;

      case 'Transaction Item':
        return html`
          <ct-typography variant="h1">Transaction Item</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            Item de lista especializado para exibir transações financeiras.
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
              <ct-transaction-item type="income" amount="4200.00" category="Salário" date="05 Out 2026">
                Pagamento Mensal
              </ct-transaction-item>
              <ct-transaction-item type="expense" amount="150.50" category="Alimentação" date="06 Out 2026">
                Supermercado
              </ct-transaction-item>
            </div>
            <pre class="code-block"><code>&lt;ct-transaction-item type="income" amount="4200.00" category="Salário" date="05 Out 2026"&gt;
  Pagamento Mensal
&lt;/ct-transaction-item&gt;</code></pre>
          </ct-card>
        `;

      case 'Badge':
        return html`
          <ct-typography variant="h1">Badge</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            Pequenos rótulos para indicar status.
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
              <ct-badge variant="success">Pago</ct-badge>
              <ct-badge variant="error">Atrasado</ct-badge>
              <ct-badge variant="warning">Pendente</ct-badge>
            </div>
            <pre class="code-block"><code>&lt;ct-badge variant="success"&gt;Pago&lt;/ct-badge&gt;
&lt;ct-badge variant="error"&gt;Atrasado&lt;/ct-badge&gt;
&lt;ct-badge variant="warning"&gt;Pendente&lt;/ct-badge&gt;</code></pre>
          </ct-card>
        `;

      default:
        return html`<ct-typography variant="h2">Selecione um componente</ct-typography>`;
    }
  }

  render() {
    return html`
      <div style="position: fixed; top: -100px; left: -100px; width: 400px; height: 400px; background: var(--ct-color-primary); opacity: 0.15; filter: blur(100px); border-radius: 50%; pointer-events: none; z-index: 0;"></div>
      <div style="position: fixed; bottom: -100px; right: -100px; width: 500px; height: 500px; background: var(--ct-color-warning); opacity: 0.1; filter: blur(120px); border-radius: 50%; pointer-events: none; z-index: 0;"></div>
      
      <div class="dashboard-container" style="position: relative; z-index: 1;">
        <ct-sidebar .items="${this.sidebarItems}" @ct-navigate="${this._handleNavigation}"></ct-sidebar>

        <div class="main-content">
          <div class="header" style="justify-content: flex-end;">
            <button @click="${this._toggleTheme}" style="background: transparent; border: none; cursor: pointer; color: var(--ct-text-primary); padding: 8px; display: flex; align-items: center; justify-content: center;">
              <ct-icon name="${this.currentTheme === 'dark' ? 'light_mode' : 'dark_mode'}" size="24px" color="currentColor"></ct-icon>
            </button>
          </div>
          
          <div style="max-width: 800px;">
            ${this.renderDocSection()}
          </div>
        </div>
      </div>
    `;
  }
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = '<cashtrack-showcase></cashtrack-showcase>';
