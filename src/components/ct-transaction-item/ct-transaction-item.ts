import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ct-icon';

export type TransactionType = 'income' | 'expense';

/**
 * A highly specific component for displaying a transaction row in CashTrack.
 */
@customElement('ct-transaction-item')
export class CtTransactionItem extends LitElement {
  @property({ type: String }) title = '';
  @property({ type: String }) date = '';
  @property({ type: String }) category = '';
  @property({ type: Number }) amount = 0;
  @property({ type: String }) type: TransactionType = 'expense';
  
  // Ex: "🛒" or raw svg string
  @property({ type: String }) icon = '';

  static styles = css`
    :host {
      display: block;
    }

    .row {
      display: flex;
      align-items: center;
      padding: 16px 24px;
      border-bottom: 1px solid var(--ct-border-color, rgba(255, 255, 255, 0.05));
      transition: background 0.2s;
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      cursor: pointer;
    }

    .row:hover {
      background: rgba(255, 255, 255, 0.02);
    }

    .icon-box {
      width: 40px;
      height: 40px;
      border-radius: 12px;
      background: rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 20px;
      margin-right: 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .type-income .icon-box {
      background: color-mix(in srgb, var(--ct-color-success) 10%, transparent);
      border-color: color-mix(in srgb, var(--ct-color-success) 20%, transparent);
      color: var(--ct-color-success);
    }

    .type-expense .icon-box {
      background: color-mix(in srgb, var(--ct-color-error) 10%, transparent);
      border-color: color-mix(in srgb, var(--ct-color-error) 20%, transparent);
      color: var(--ct-color-error);
    }

    .details {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .title {
      color: #FFFFFF;
      font-size: 16px;
      font-weight: 500;
      margin: 0;
    }

    .meta {
      color: var(--ct-text-secondary, #B3B3B3);
      font-size: 14px;
      display: flex;
      gap: 8px;
      align-items: center;
    }

    .dot {
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--ct-text-secondary, #B3B3B3);
    }

    .amount {
      font-size: 16px;
      font-weight: 600;
      text-align: right;
    }

    .type-income .amount {
      color: var(--ct-color-success, #4CAF50);
    }

    .type-expense .amount {
      color: var(--ct-color-error, #F44336);
    }
  `;

  private formatAmount(val: number): string {
    const formatted = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Math.abs(val));
    
    return this.type === 'income' ? `+${formatted}` : `-${formatted}`;
  }

  render() {
    return html`
      <div class="row type-${this.type}" part="base">
        <div class="icon-box" part="icon">
          ${this.icon 
            ? (this.icon.includes('<svg') || this.icon.match(/[\uD800-\uDBFF][\uDC00-\uDFFF]/)
                ? html`<span .innerHTML=${this.icon}></span>`
                : html`<ct-icon name=${this.icon} size="20px" color="currentColor"></ct-icon>`) 
            : html`<ct-icon name="receipt_long" size="20px" color="currentColor"></ct-icon>`
          }
        </div>
        
        <div class="details">
          <h4 class="title">${this.title}</h4>
          <div class="meta">
            <span>${this.date}</span>
            ${this.category ? html`<div class="dot"></div><span>${this.category}</span>` : ''}
          </div>
        </div>
        
        <div class="amount" part="amount">
          ${this.formatAmount(this.amount)}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-transaction-item': CtTransactionItem;
  }
}
