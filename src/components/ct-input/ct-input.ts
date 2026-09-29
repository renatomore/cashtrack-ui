import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { live } from 'lit/directives/live.js';

/**
 * A Form Input component for the CashTrack Design System.
 */
@customElement('ct-input')
export class CtInput extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: String }) type = 'text';
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;

  @state() private _focused = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      margin-bottom: 16px;
    }

    .input-container {
      position: relative;
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      border: 1px solid var(--ct-border-color, #333333);
      border-radius: var(--ct-radius-md, 8px);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
    }

    .input-container:hover:not(.disabled) {
      border-color: rgba(255, 255, 255, 0.3);
    }

    .input-container.focused {
      border-color: var(--ct-color-primary, #00E5FF);
      box-shadow: 0 0 0 1px var(--ct-color-primary, #00E5FF), 0 0 8px rgba(0, 229, 255, 0.2);
    }

    .input-container.error {
      border-color: var(--ct-color-error, #F44336);
    }

    .input-container.error.focused {
      box-shadow: 0 0 0 1px var(--ct-color-error, #F44336), 0 0 8px rgba(244, 67, 54, 0.2);
    }

    .input-container.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    input {
      width: 100%;
      background: transparent;
      border: none;
      color: #FFFFFF;
      font-family: inherit;
      font-size: 16px;
      padding: 24px 16px 8px 16px;
      outline: none;
    }

    input:disabled {
      cursor: not-allowed;
    }

    .label {
      position: absolute;
      left: 16px;
      top: 16px;
      color: var(--ct-text-secondary, #B3B3B3);
      font-size: 16px;
      pointer-events: none;
      transition: all 0.2s ease;
      transform-origin: left top;
    }

    .input-container.focused .label,
    .input-container.has-value .label {
      transform: translateY(-10px) scale(0.75);
      color: var(--ct-color-primary, #00E5FF);
    }

    .input-container.error .label {
      color: var(--ct-color-error, #F44336);
    }

    .input-container:not(.focused).has-value .label {
      color: var(--ct-text-secondary, #B3B3B3);
    }

    .error-message {
      color: var(--ct-color-error, #F44336);
      font-size: 12px;
      margin-top: 4px;
      margin-left: 4px;
    }
  `;

  private _handleFocus() {
    this._focused = true;
  }

  private _handleBlur() {
    this._focused = false;
  }

  private _handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    this.value = target.value;
    this.dispatchEvent(new CustomEvent('ct-change', {
      detail: { value: this.value },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    const hasValue = this.value && this.value.length > 0;
    const containerClasses = [
      'input-container',
      this._focused ? 'focused' : '',
      hasValue ? 'has-value' : '',
      this.error ? 'error' : '',
      this.disabled ? 'disabled' : ''
    ].join(' ');

    return html`
      <div class="${containerClasses}" part="container">
        <label class="label" part="label">${this.label}</label>
        <input
          type="${this.type}"
          .value="${live(this.value)}"
          ?disabled="${this.disabled}"
          @focus="${this._handleFocus}"
          @blur="${this._handleBlur}"
          @input="${this._handleInput}"
          part="input"
        />
      </div>
      ${this.error ? html`<div class="error-message" part="error">${this.error}</div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-input': CtInput;
  }
}
