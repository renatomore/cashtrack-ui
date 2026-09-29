import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';
import '../ct-input';

/**
 * A Currency Input component for CashTrack that displays BRL format but emits raw numbers.
 */
@customElement('ct-currency-input')
export class CtCurrencyInput extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: Number }) value: number | null = null;
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;

  @state() private _displayValue = '';

  static styles = css`
    :host {
      display: block;
    }
  `;

  // Format number to R$ string
  private formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  }

  // Parse string back to number
  private parseCurrency(valueStr: string): number {
    // Remove everything except numbers
    const digits = valueStr.replace(/\D/g, '');
    if (!digits) return 0;
    return parseInt(digits, 10) / 100;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.value !== null) {
      this._displayValue = this.formatCurrency(this.value);
    }
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('value') && this.value !== null) {
      this._displayValue = this.formatCurrency(this.value);
    }
  }

  private _handleChange(e: CustomEvent) {
    const rawString = e.detail.value;
    const numericValue = this.parseCurrency(rawString);
    
    this.value = numericValue;
    this._displayValue = numericValue === 0 && !rawString ? '' : this.formatCurrency(numericValue);

    // Force sync the underlying ct-input to clear invalid chars
    const inputEl = this.shadowRoot?.querySelector('ct-input') as any;
    if (inputEl) {
      inputEl.value = this._displayValue;
    }

    // Emit the raw numeric value
    this.dispatchEvent(new CustomEvent('ct-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <ct-input
        .label="${this.label}"
        .value="${live(this._displayValue)}"
        .error="${this.error}"
        ?disabled="${this.disabled}"
        @ct-change="${this._handleChange}"
        part="input"
      ></ct-input>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-currency-input': CtCurrencyInput;
  }
}
