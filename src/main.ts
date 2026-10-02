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
import { translations } from './i18n';
import type { Language } from './i18n';

@customElement('cashtrack-showcase')
export class CashtrackShowcase extends LitElement {
  protected createRenderRoot() {
    return this;
  }

  @state() private activeRouteId = 'home';
  @state() private isModalOpen = false;
  @state() private isDrawerOpen = false;
  @state() private isAlertOpen = false;
  @state() private currentTheme = 'dark';
  @state() private currentLang: Language = 'pt';
  @state() private changelogData: any = null;

  override connectedCallback() {
    super.connectedCallback();
    fetch(`${import.meta.env.BASE_URL}changelog.json`)
      .then(r => r.json())
      .then(data => this.changelogData = data)
      .catch(e => console.error('Failed to load changelog', e));
  }

  private get sidebarItems() {
    const t = translations[this.currentLang].sidebar;
    const c = translations[this.currentLang].common;
    return [
      { id: 'home', label: t.home, icon: 'home', active: this.activeRouteId === 'home' },
      { id: 'changelog', label: t.changelog, icon: 'history', active: this.activeRouteId === 'changelog' },
      { id: 'storybook', label: 'Storybook', icon: 'menu_book', href: 'storybook/', external: true },
      { label: c.componentsCategory, isSeparator: true },
      { id: 'button', label: t.button, icon: 'smart_button', active: this.activeRouteId === 'button' },
      { id: 'typography', label: t.typography, icon: 'text_fields', active: this.activeRouteId === 'typography' },
      { id: 'card', label: t.card, icon: 'space_dashboard', active: this.activeRouteId === 'card' },
      { id: 'input', label: t.input, icon: 'input', active: this.activeRouteId === 'input' },
      { id: 'select', label: t.select, icon: 'arrow_drop_down_circle', active: this.activeRouteId === 'select' },
      { id: 'modal', label: t.modal, icon: 'picture_in_picture', active: this.activeRouteId === 'modal' },
      { id: 'drawer', label: t.drawer, icon: 'vertical_split', active: this.activeRouteId === 'drawer' },
      { id: 'alert', label: t.alert, icon: 'warning', active: this.activeRouteId === 'alert' },
      { id: 'transaction', label: t.transaction, icon: 'receipt_long', active: this.activeRouteId === 'transaction' },
      { id: 'badge', label: t.badge, icon: 'label', active: this.activeRouteId === 'badge' }
    ];
  }

  private _handleNavigation(e: CustomEvent) {
    const item = this.sidebarItems.find(i => i.label === e.detail.label);
    if (item?.id) {
      this.activeRouteId = item.id;
    }
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

  private _handleLanguageChange(e: CustomEvent) {
    this.currentLang = e.detail.value as Language;
  }

  private _renderPropsTable(props: Array<{name: string, type: string, defaultVal: string, desc: string}>) {
    const t = translations[this.currentLang].docs;
    return html`
      <ct-card style="margin-top: 24px;">
        <ct-typography variant="h3" style="margin-bottom: 16px;">${t.propsTitle}</ct-typography>
        <div style="overflow-x: auto;">
          <table class="props-table">
            <thead>
              <tr>
                <th>${t.propName}</th>
                <th>${t.propType}</th>
                <th>${t.propDefault}</th>
                <th>${t.propDesc}</th>
              </tr>
            </thead>
            <tbody>
              ${props.map(p => html`
                <tr>
                  <td><code>${p.name}</code></td>
                  <td><code style="color: var(--ct-color-warning); background: transparent; border: 1px solid var(--ct-border-color);">${p.type}</code></td>
                  <td>${p.defaultVal === '-' ? '-' : html`<code>${p.defaultVal}</code>`}</td>
                  <td>${p.desc}</td>
                </tr>
              `)}
            </tbody>
          </table>
        </div>
      </ct-card>
    `;
  }

  private renderDocSection() {
    const t = translations[this.currentLang].docs;
    const c = translations[this.currentLang].common;
    const s = translations[this.currentLang].sidebar;

    switch (this.activeRouteId) {
      case 'home':
        return html`
          <ct-typography variant="h1" style="color: var(--ct-color-primary);">${t.homeTitle}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px; font-size: 1.1rem; line-height: 1.6;">
            ${t.homeDesc}
          </ct-typography>
          
          <ct-card style="margin-bottom: 24px;">
            <ct-typography variant="h2" style="margin-bottom: 16px;">${t.homeInstall}</ct-typography>
            <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 16px;">
              ${t.homeInstallDesc}
            </ct-typography>
            <pre class="code-block" style="margin: 0;"><code>npm install cashtrack-ui</code></pre>
          </ct-card>

          <ct-card>
            <ct-typography variant="h2" style="margin-bottom: 16px;">${t.homeUsage}</ct-typography>
            <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 16px;">
              ${t.homeUsageDesc}
            </ct-typography>
            <pre class="code-block" style="margin: 0;"><code>import 'cashtrack-ui';

// ${this.currentLang === 'pt' ? 'No seu HTML:' : 'In your HTML:'}
&lt;ct-button variant="primary"&gt;${this.currentLang === 'pt' ? 'Meu Botão' : 'My Button'}&lt;/ct-button&gt;</code></pre>
          </ct-card>
        `;

      case 'button':
        return html`
          <ct-typography variant="h1">${s.button}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.buttonDesc}
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <ct-typography variant="h3" style="margin-bottom: 16px;">${c.availableVariants}</ct-typography>
            
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
          
          ${this._renderPropsTable([
            { name: 'variant', type: "'primary' | 'secondary' | 'tonal' | 'neon' | 'neumorph' | 'outline' | 'text'", defaultVal: "'primary'", desc: 'The visual variant of the button.' },
            { name: 'size', type: "'small' | 'medium' | 'large'", defaultVal: "'medium'", desc: 'The sizing scale of the button.' },
            { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: 'Disables button interactions.' }
          ])}
        `;

      case 'typography':
        return html`
          <ct-typography variant="h1">${s.typography}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.typographyDesc}
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

          ${this._renderPropsTable([
            { name: 'variant', type: "'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption'", defaultVal: "'body1'", desc: 'The typography scale and HTML element to use.' },
            { name: 'color', type: "'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' | 'success'", defaultVal: "'textPrimary'", desc: 'Semantic color to apply to the text.' }
          ])}
        `;

      case 'card':
        return html`
          <ct-typography variant="h1">${s.card}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.cardDesc}
          </ct-typography>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px;">
            <ct-card>
              <ct-typography variant="h3">Standard Card</ct-typography>
              <ct-typography variant="body1" color="var(--ct-text-secondary)">${t.cardStandardBody}</ct-typography>
            </ct-card>
            <ct-card class="card-gold-glow">
              <ct-typography variant="h3" class="text-gold">Glowing Card</ct-typography>
              <ct-typography variant="body1" color="var(--ct-text-secondary)">${t.cardGlowBody}</ct-typography>
            </ct-card>
          </div>
          <ct-card>
            <pre class="code-block"><code>&lt;ct-card&gt;
  &lt;ct-typography variant="h3"&gt;Title&lt;/ct-typography&gt;
&lt;/ct-card&gt;</code></pre>
          </ct-card>

          ${this._renderPropsTable([
            { name: 'glass', type: 'boolean', defaultVal: 'false', desc: 'Applies an elevated glassmorphism effect (box-shadow and higher blur).' }
          ])}
        `;

      case 'input':
        return html`
          <ct-typography variant="h1">${s.input}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.inputDesc}
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; max-width: 400px;">
              <ct-input label="${t.inputNameLabel}" placeholder="${t.inputNamePlaceholder}"></ct-input>
              <ct-input label="${t.inputEmailLabel}" type="email" error="${t.inputEmailError}"></ct-input>
              <ct-currency-input label="Valor (R$)" placeholder="R$ 0,00"></ct-currency-input>
            </div>
            <pre class="code-block"><code>&lt;ct-input label="Nome"&gt;&lt;/ct-input&gt;
&lt;ct-input label="E-mail" error="E-mail inválido"&gt;&lt;/ct-input&gt;
&lt;ct-currency-input label="Valor"&gt;&lt;/ct-currency-input&gt;</code></pre>
          </ct-card>

          ${this._renderPropsTable([
            { name: 'label', type: 'string', defaultVal: "''", desc: 'Floating label text for the input.' },
            { name: 'value', type: 'string', defaultVal: "''", desc: 'The current value of the input.' },
            { name: 'type', type: 'string', defaultVal: "'text'", desc: 'Native input type (text, email, password, etc).' },
            { name: 'error', type: 'string', defaultVal: "''", desc: 'Error message to display below the input.' },
            { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: 'Disables input interaction.' }
          ])}
        `;

      case 'select':
        return html`
          <ct-typography variant="h1">${s.select}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.selectDesc}
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="margin-bottom: 24px; max-width: 400px;">
              <ct-select 
                label="${t.selectCategory}" 
                .options="${[{label: t.selectFood, value: 'food'}, {label: t.selectSalary, value: 'salary'}]}">
              </ct-select>
            </div>
            <pre class="code-block"><code>&lt;ct-select 
  label="Categoria" 
  .options="\${[{label: 'Item', value: '1'}]}"&gt;
&lt;/ct-select&gt;</code></pre>
          </ct-card>

          ${this._renderPropsTable([
            { name: 'label', type: 'string', defaultVal: "''", desc: 'Floating label text for the select.' },
            { name: 'value', type: 'string', defaultVal: "''", desc: 'The current selected value.' },
            { name: 'options', type: 'SelectOption[]', defaultVal: '[]', desc: 'Array of option objects ({label, value, icon, image}).' },
            { name: 'error', type: 'string', defaultVal: "''", desc: 'Error message to display below the select.' },
            { name: 'disabled', type: 'boolean', defaultVal: 'false', desc: 'Disables select interaction.' }
          ])}
        `;

      case 'modal':
        return html`
          <ct-typography variant="h1">${s.modal}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.modalDesc}
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <ct-button variant="primary" @click="${() => this.isModalOpen = true}" style="margin-bottom: 24px;">${t.modalOpen}</ct-button>
            <pre class="code-block"><code>&lt;ct-modal ?open="\${this.isOpen}" @ct-close="\${this.close}"&gt;
  &lt;span slot="title"&gt;Título&lt;/span&gt;
  &lt;p&gt;Conteúdo&lt;/p&gt;
  &lt;ct-button slot="footer"&gt;Ação&lt;/ct-button&gt;
&lt;/ct-modal&gt;</code></pre>
          </ct-card>
          <ct-modal ?open="${this.isModalOpen}" @ct-close="${() => this.isModalOpen = false}">
            <span slot="title">${t.modalTitle}</span>
            <ct-typography variant="body1">${t.modalBody}</ct-typography>
            <ct-button slot="footer" variant="outline" @click="${() => this.isModalOpen = false}">${t.modalClose}</ct-button>
          </ct-modal>

          ${this._renderPropsTable([
            { name: 'open', type: 'boolean', defaultVal: 'false', desc: 'Controls whether the modal is visible.' },
            { name: 'disableBackdropClick', type: 'boolean', defaultVal: 'false', desc: 'Prevents closing the modal when clicking outside.' }
          ])}
        `;

      case 'drawer':
        return html`
          <ct-typography variant="h1">${s.drawer}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.drawerDesc}
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <ct-button variant="primary" @click="${() => this.isDrawerOpen = true}" style="margin-bottom: 24px;">${t.drawerOpen}</ct-button>
            <pre class="code-block"><code>&lt;ct-drawer ?open="\${this.isOpen}" position="right"&gt;
  &lt;p&gt;Filtros&lt;/p&gt;
&lt;/ct-drawer&gt;</code></pre>
          </ct-card>
          <ct-drawer ?open="${this.isDrawerOpen}" position="right" @ct-close="${() => this.isDrawerOpen = false}">
            <ct-typography variant="h2">${t.drawerTitle}</ct-typography>
            <ct-typography variant="body1">${t.drawerBody}</ct-typography>
          </ct-drawer>

          ${this._renderPropsTable([
            { name: 'open', type: 'boolean', defaultVal: 'false', desc: 'Controls whether the drawer is visible.' },
            { name: 'position', type: "'left' | 'right'", defaultVal: "'right'", desc: 'Which side of the screen the drawer slides from.' }
          ])}
        `;

      case 'alert':
        return html`
          <ct-typography variant="h1">${s.alert}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.alertDesc}
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
              <ct-button variant="primary" @click="${() => { this.isAlertOpen = true; setTimeout(() => this.isAlertOpen = false, 3000); }}">${t.alertTrigger}</ct-button>
            </div>
            <pre class="code-block"><code>&lt;ct-alert ?open="\${this.isOpen}" variant="success" position="right"&gt;
  Sucesso!
&lt;/ct-alert&gt;</code></pre>
          </ct-card>
          <ct-alert ?open="${this.isAlertOpen}" variant="success" position="right" @ct-close="${() => this.isAlertOpen = false}">
            ${t.alertSuccess}
          </ct-alert>

          ${this._renderPropsTable([
            { name: 'variant', type: "'success' | 'error' | 'warning' | 'info'", defaultVal: "'info'", desc: 'Semantic intent of the alert.' },
            { name: 'position', type: "'left' | 'center' | 'right'", defaultVal: "'right'", desc: 'Screen placement position.' },
            { name: 'open', type: 'boolean', defaultVal: 'false', desc: 'Controls whether the alert is visible.' }
          ])}
        `;

      case 'transaction':
        return html`
          <ct-typography variant="h1">${s.transaction}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.transactionDesc}
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
              <ct-transaction-item type="income" amount="4200.00" category="Salário" date="05 Out 2026">
                ${t.transactionIncome}
              </ct-transaction-item>
              <ct-transaction-item type="expense" amount="150.50" category="Alimentação" date="06 Out 2026">
                ${t.transactionExpense}
              </ct-transaction-item>
            </div>
            <pre class="code-block"><code>&lt;ct-transaction-item type="income" amount="4200.00" category="Salário" date="05 Out 2026"&gt;
  Pagamento Mensal
&lt;/ct-transaction-item&gt;</code></pre>
          </ct-card>

          ${this._renderPropsTable([
            { name: 'title', type: 'string', defaultVal: "''", desc: 'Main title of the transaction.' },
            { name: 'date', type: 'string', defaultVal: "''", desc: 'Formatted date of the transaction.' },
            { name: 'category', type: 'string', defaultVal: "''", desc: 'Optional category name.' },
            { name: 'amount', type: 'number', defaultVal: '0', desc: 'Transaction value (will be formatted automatically).' },
            { name: 'type', type: "'income' | 'expense'", defaultVal: "'expense'", desc: 'Visual indicator of money flow.' },
            { name: 'icon', type: 'string', defaultVal: "''", desc: 'Icon name (Material Symbols) or raw SVG.' }
          ])}
        `;

      case 'badge':
        return html`
          <ct-typography variant="h1">${s.badge}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${t.badgeDesc}
          </ct-typography>
          <ct-card style="margin-bottom: 24px;">
            <div style="display: flex; gap: 16px; margin-bottom: 24px;">
              <ct-badge variant="success">${t.badgePaid}</ct-badge>
              <ct-badge variant="error">${t.badgeLate}</ct-badge>
              <ct-badge variant="warning">${t.badgePending}</ct-badge>
            </div>
            <pre class="code-block"><code>&lt;ct-badge variant="success"&gt;Pago&lt;/ct-badge&gt;
&lt;ct-badge variant="error"&gt;Atrasado&lt;/ct-badge&gt;
&lt;ct-badge variant="warning"&gt;Pendente&lt;/ct-badge&gt;</code></pre>
          </ct-card>

          ${this._renderPropsTable([
            { name: 'variant', type: "'success' | 'error' | 'warning' | 'info' | 'default'", defaultVal: "'default'", desc: 'Visual variant representing the status.' }
          ])}
        `;

      case 'changelog':
        const langKey = this.currentLang === 'pt' ? 'pt-BR' : 'en';
        const changes = this.changelogData ? this.changelogData[langKey] : [];
        return html`
          <ct-typography variant="h1">${s.changelog}</ct-typography>
          <ct-typography variant="body1" color="var(--ct-text-secondary)" style="margin-bottom: 32px;">
            ${this.currentLang === 'pt' ? 'Histórico de versões e alterações do Design System.' : 'Version history and changes of the Design System.'}
          </ct-typography>
          ${!this.changelogData ? html`<ct-typography variant="body1">Carregando...</ct-typography>` : ''}
          ${changes.map((release: any) => html`
            <ct-card style="margin-bottom: 24px;">
              <ct-typography variant="h2" style="margin-bottom: 8px;">v${release.version} <span style="font-size: 14px; color: var(--ct-text-secondary); font-weight: normal;">${release.date ? `- ${release.date}` : ''}</span></ct-typography>
              ${Object.entries(release.changes).map(([category, items]: [string, any]) => html`
                <ct-typography variant="h3" style="margin-top: 16px; margin-bottom: 8px; color: var(--ct-color-primary); font-size: 1.1rem;">${category}</ct-typography>
                <ul style="color: var(--ct-text-primary); margin: 0; padding-left: 20px; line-height: 1.6;">
                  ${(items as string[]).map((item: string) => html`<li>${item}</li>`)}
                </ul>
              `)}
            </ct-card>
          `)}
        `;

      default:
        return html`<ct-typography variant="h2">${c.selectComponent}</ct-typography>`;
    }
  }

  render() {
    return html`
      <div style="position: fixed; top: -100px; left: -100px; width: 400px; height: 400px; background: var(--ct-color-primary); opacity: 0.15; filter: blur(100px); border-radius: 50%; pointer-events: none; z-index: 0;"></div>
      <div style="position: fixed; bottom: -100px; right: -100px; width: 500px; height: 500px; background: var(--ct-color-warning); opacity: 0.1; filter: blur(120px); border-radius: 50%; pointer-events: none; z-index: 0;"></div>
      
      <div class="dashboard-container" style="position: relative; z-index: 1;">
        <ct-sidebar .items="${this.sidebarItems}" @ct-navigate="${this._handleNavigation}"></ct-sidebar>

        <div class="main-content">
          <div style="max-width: 800px; margin: 0 auto; width: 100%;">
            <div class="header" style="justify-content: flex-end; gap: 16px;">
              <button class="mobile-menu-btn" @click="${() => {
                const sidebar = this.querySelector('ct-sidebar');
                if (sidebar) sidebar.mobileOpen = true;
              }}" style="margin-right: auto; background: transparent; border: none; color: var(--ct-text-primary); cursor: pointer; padding: 8px; display: flex; align-items: center; border-radius: 8px;">
                <ct-icon name="menu" size="28px" color="currentColor"></ct-icon>
              </button>
              <div style="width: 140px;">
                <ct-select
                  .value="${this.currentLang}"
                  .options="${[
                    {label: 'PT-BR', value: 'pt', image: 'https://flagcdn.com/w20/br.png'}, 
                    {label: 'EN-US', value: 'en', image: 'https://flagcdn.com/w20/us.png'}
                  ]}"
                  @ct-change="${this._handleLanguageChange}">
                </ct-select>
              </div>
              <button @click="${this._toggleTheme}" style="background: transparent; border: none; cursor: pointer; color: var(--ct-text-primary); padding: 8px; display: flex; align-items: center; justify-content: center; height: 56px;">
                <ct-icon name="${this.currentTheme === 'dark' ? 'light_mode' : 'dark_mode'}" size="24px" color="currentColor"></ct-icon>
              </button>
            </div>
            
            <div>
              ${this.renderDocSection()}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = '<cashtrack-showcase></cashtrack-showcase>';
