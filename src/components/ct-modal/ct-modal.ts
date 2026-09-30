import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ct-icon';

/**
 * A Modal component for the CashTrack Design System.
 */
@customElement('ct-modal')
export class CtModal extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  
  /**
   * Se true, o modal NÃO fecha quando o usuário clica no fundo escuro.
   */
  @property({ type: Boolean }) disableBackdropClick = false;

  static styles = css`
    :host {
      display: block;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: var(--ct-backdrop, rgba(0, 0, 0, 0.7));
      backdrop-filter: blur(6px);
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .backdrop.open {
      opacity: 1;
      visibility: visible;
    }

    .modal {
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      border: 1px solid var(--ct-border-color);
      border-radius: var(--ct-radius-lg, 16px);
      width: 90%;
      max-width: 500px;
      max-height: 90vh;
      box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3), inset 0 1px 0 var(--ct-overlay-hover);
      transform: scale(0.95) translateY(20px);
      opacity: 0;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }

    .backdrop.open .modal {
      transform: scale(1) translateY(0);
      opacity: 1;
    }

    .header {
      padding: 24px;
      border-bottom: 1px solid var(--ct-border-color, #333333);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .title {
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      font-size: 20px;
      font-weight: 600;
      color: var(--ct-text-primary);
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      color: var(--ct-text-secondary);
      cursor: pointer;
      padding: 8px;
      margin: -8px;
      display: flex;
      transition: color 0.2s, background 0.2s;
      border-radius: 4px;
    }

    .close-btn:hover {
      color: var(--ct-text-primary);
      background: var(--ct-overlay-hover);
    }

    .content {
      padding: 24px;
      overflow-y: auto;
      color: var(--ct-text-secondary, #B3B3B3);
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      font-size: 16px;
      line-height: 1.5;
    }

    .footer {
      padding: 16px 24px;
      border-top: 1px solid var(--ct-border-color, #333333);
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      background: var(--ct-overlay-hover);
      border-bottom-left-radius: 16px;
      border-bottom-right-radius: 16px;
    }
  `;

  private _handleBackdropClick(e: MouseEvent) {
    // Only close if the click was directly on the backdrop (not inside the modal)
    if (e.target === e.currentTarget && !this.disableBackdropClick) {
      this._close();
    }
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('ct-close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="backdrop ${this.open ? 'open' : ''}" @click=${this._handleBackdropClick}>
        <div class="modal" part="dialog" role="dialog" aria-modal="true">
          <div class="header">
            <h2 class="title" part="title"><slot name="title">Modal Title</slot></h2>
            <button class="close-btn" @click=${this._close} aria-label="Close">
              <ct-icon name="close" size="20px" color="currentColor"></ct-icon>
            </button>
          </div>
          <div class="content" part="content">
            <slot></slot>
          </div>
          <div class="footer" part="footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-modal': CtModal;
  }
}
