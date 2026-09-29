import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ct-icon';

export type AlertPosition = 'left' | 'center' | 'right';
export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

/**
 * A Toast Alert component for the CashTrack Design System.
 */
@customElement('ct-alert')
export class CtAlert extends LitElement {
  @property({ type: String }) variant: AlertVariant = 'info';
  @property({ type: String }) position: AlertPosition = 'right';
  @property({ type: Boolean, reflect: true }) open = false;

  static styles = css`
    :host {
      display: block;
      position: fixed;
      z-index: 9999;
      bottom: 24px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      pointer-events: none;
      transform: translateY(20px);
    }

    :host([open]) {
      opacity: 1;
      pointer-events: auto;
      transform: translateY(0);
    }

    :host([position='right']) {
      right: 24px;
    }

    :host([position='left']) {
      left: 24px;
    }

    :host([position='center']) {
      left: 50%;
      transform: translate(-50%, 20px);
    }

    :host([open][position='center']) {
      transform: translate(-50%, 0);
    }

    .alert {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 24px;
      border-radius: var(--ct-radius-md, 8px);
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      font-weight: 500;
      font-size: 14px;
      color: #FFFFFF;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      border-left: 4px solid transparent;
    }

    .variant-success {
      border-left-color: var(--ct-color-success, #4CAF50);
    }

    .variant-error {
      border-left-color: var(--ct-color-error, #F44336);
    }

    .variant-warning {
      border-left-color: var(--ct-color-warning, #FF9800);
    }

    .variant-info {
      border-left-color: var(--ct-color-primary, #00E5FF);
    }

    .close-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      padding: 0;
      margin-left: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }

    .close-btn:hover {
      color: #FFFFFF;
    }
  `;

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('ct-close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="alert variant-${this.variant}" part="base">
        <div class="content" part="content">
          <slot></slot>
        </div>
        <button class="close-btn" @click=${this._close} aria-label="Close alert">
          <ct-icon name="close" size="16px" color="currentColor"></ct-icon>
        </button>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-alert': CtAlert;
  }
}
