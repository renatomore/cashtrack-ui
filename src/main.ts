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

  @state() private _isModalOpen = false;
  @state() private _isDrawerOpen = false;
  @state() private _isAlertOpen = false;

  private sidebarItems = [
    { label: 'Dashboard', href: '#', icon: 'dashboard' },
    { label: 'Transações', href: '#', icon: 'list' },
    { label: 'Relatórios', href: '#', icon: 'bar_chart' },
    { label: 'Sair (Evento)', icon: 'logout' }
  ];

  private _openModal() { this._isModalOpen = true; }
  private _closeModal() { this._isModalOpen = false; }
  
  private _openDrawer() { this._isDrawerOpen = true; }
  private _closeDrawer() { this._isDrawerOpen = false; }
  
  private _triggerAlert() { 
    this._isAlertOpen = true; 
    setTimeout(() => { this._isAlertOpen = false; }, 3000);
  }

  private _toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute('data-theme');
    if (currentTheme === 'light') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', 'light');
    }
  }

  render() {
    return html`
      <div style="position: fixed; top: -100px; left: -100px; width: 400px; height: 400px; background: var(--ct-color-primary); opacity: 0.15; filter: blur(100px); border-radius: 50%; pointer-events: none; z-index: 0;"></div>
      <div style="position: fixed; bottom: -100px; right: -100px; width: 500px; height: 500px; background: var(--ct-color-warning); opacity: 0.1; filter: blur(120px); border-radius: 50%; pointer-events: none; z-index: 0;"></div>
      
      <div class="dashboard-container" style="position: relative; z-index: 1;">
        <ct-sidebar .items="${this.sidebarItems}" @ct-navigate="${(e: CustomEvent) => alert('Evento Recebido! Item clicado: ' + e.detail.label)}"></ct-sidebar>

        <div class="main-content">
          <div class="header">
            <div>
              <ct-typography variant="h1">Dashboard</ct-typography>
              <ct-typography variant="body1" color="var(--ct-text-secondary)">Bem-vindo de volta, Renato!</ct-typography>
            </div>
            <div style="display: flex; gap: 16px;">
              <ct-button variant="outline" @click="${this._toggleTheme}">Alternar Tema</ct-button>
              <ct-button variant="primary" @click="${this._openModal}">Nova Transação</ct-button>
            </div>
          </div>

          <!-- Demonstrando o Grid System -->
          <div class="ct-container" style="padding: 0; margin-bottom: 32px; max-width: none;">
            <div class="ct-row">
              <div class="ct-col-4 ct-col-md-12" style="margin-bottom: 24px;">
                <ct-card class="card-gold-glow">
                  <div class="card-content">
                    <div class="card-header">
                      <ct-typography variant="body1" color="var(--ct-text-secondary)">Saldo Total</ct-typography>
                      <ct-icon name="wallet" size="24px" color="var(--ct-color-warning)"></ct-icon>
                    </div>
                    <ct-typography variant="h2" class="text-gold">R$ 15.350,00</ct-typography>
                  </div>
                </ct-card>
              </div>
              <div class="ct-col-4 ct-col-md-6" style="margin-bottom: 24px;">
                <ct-card>
                  <div class="card-content">
                    <div class="card-header">
                      <ct-typography variant="body1" color="var(--ct-text-secondary)">Receitas</ct-typography>
                      <ct-badge variant="success">+15%</ct-badge>
                    </div>
                    <ct-typography variant="h2" color="var(--ct-color-success)">R$ 4.200,00</ct-typography>
                  </div>
                </ct-card>
              </div>
              <div class="ct-col-4 ct-col-md-6" style="margin-bottom: 24px;">
                <ct-card>
                  <div class="card-content">
                    <div class="card-header">
                      <ct-typography variant="body1" color="var(--ct-text-secondary)">Despesas</ct-typography>
                      <ct-badge variant="error">-5%</ct-badge>
                    </div>
                    <ct-typography variant="h2" color="var(--ct-color-error)">R$ 1.850,00</ct-typography>
                  </div>
                </ct-card>
              </div>
            </div>
          </div>

          <div class="transactions-list">
            <div class="header" style="margin-bottom: 0;">
              <ct-typography variant="h2">Transações Recentes</ct-typography>
              <ct-button variant="outline" @click="${this._openDrawer}">Filtros</ct-button>
            </div>

            <ct-transaction-item type="income" amount="4200.00" category="Salário" date="05 Out 2026">
              Pagamento Mensal
            </ct-transaction-item>
            
            <ct-transaction-item type="expense" amount="150.50" category="Alimentação" date="06 Out 2026">
              Supermercado
            </ct-transaction-item>
            
            <ct-transaction-item type="expense" amount="34.90" category="Assinaturas" date="07 Out 2026">
              Netflix
            </ct-transaction-item>
          </div>
          
          <div class="actions-row">
            <ct-button variant="secondary" @click="${this._triggerAlert}">Testar Alerta de Sucesso</ct-button>
          </div>
        </div>

        <!-- Overlays -->
        <ct-modal ?open="${this._isModalOpen}" @ct-close="${this._closeModal}">
          <span slot="title">Adicionar Transação</span>
          <div class="form-group">
            <ct-input label="Descrição"></ct-input>
            <ct-currency-input label="Valor (R$)"></ct-currency-input>
            <ct-select label="Categoria" .options="${[{label: 'Alimentação', value: 'food'}, {label: 'Salário', value: 'salary'}]}"></ct-select>
          </div>
          <ct-button slot="footer" variant="outline" @click="${this._closeModal}">Cancelar</ct-button>
          <ct-button slot="footer" variant="primary" @click="${this._closeModal}">Salvar</ct-button>
        </ct-modal>

        <ct-drawer ?open="${this._isDrawerOpen}" position="right" @ct-close="${this._closeDrawer}">
          <ct-typography variant="h2">Filtros</ct-typography>
          <div class="form-group">
            <ct-select label="Mês" .options="${[{label: 'Outubro', value: '10'}, {label: 'Novembro', value: '11'}]}"></ct-select>
            <ct-button variant="primary" style="margin-top: 16px;">Aplicar</ct-button>
          </div>
        </ct-drawer>

        <ct-alert ?open="${this._isAlertOpen}" variant="success" position="right" @ct-close="${() => this._isAlertOpen = false}">
          Transação adicionada com sucesso!
        </ct-alert>
      </div>
    `;
  }
}

document.querySelector<HTMLDivElement>('#app')!.innerHTML = '<cashtrack-showcase></cashtrack-showcase>';
