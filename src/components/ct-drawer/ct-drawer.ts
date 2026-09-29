import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type DrawerPosition = 'left' | 'right';

/**
 * A Drawer component for the CashTrack Design System.
 */
@customElement('ct-drawer')
export class CtDrawer extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;
  @property({ type: String }) position: DrawerPosition = 'right';

  static styles = css`
    :host {
      display: block;
    }

    .backdrop {
      position: fixed;
      inset: 0;
      background: rgba(0, 0, 0, 0.6);
      backdrop-filter: blur(4px);
      z-index: 999;
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
    }

    .backdrop.open {
      opacity: 1;
      visibility: visible;
    }

    .drawer {
      position: fixed;
      top: 0;
      bottom: 0;
      width: 100%;
      max-width: 400px;
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      z-index: 1000;
      box-shadow: 0 0 24px rgba(0, 0, 0, 0.5);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      display: flex;
      flex-direction: column;
    }

    .drawer.pos-right {
      right: 0;
      transform: translateX(100%);
    }

    .drawer.pos-left {
      left: 0;
      transform: translateX(-100%);
    }

    .drawer.open {
      transform: translateX(0);
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
      color: #FFFFFF;
      margin: 0;
    }

    .close-btn {
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.6);
      cursor: pointer;
      padding: 8px;
      display: flex;
      transition: color 0.2s;
    }

    .close-btn:hover {
      color: #FFFFFF;
    }

    .content {
      padding: 24px;
      flex: 1;
      overflow-y: auto;
      color: var(--ct-text-secondary, #B3B3B3);
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
    }
  `;

  private _handleBackdropClick() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('ct-close', { bubbles: true, composed: true }));
  }

  private _close() {
    this.open = false;
    this.dispatchEvent(new CustomEvent('ct-close', { bubbles: true, composed: true }));
  }

  render() {
    return html`
      <div class="backdrop ${this.open ? 'open' : ''}" @click=${this._handleBackdropClick}></div>
      <div class="drawer pos-${this.position} ${this.open ? 'open' : ''}" part="panel">
        <div class="header">
          <h2 class="title" part="title"><slot name="title">Drawer</slot></h2>
          <button class="close-btn" @click=${this._close} aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="content" part="content">
          <slot></slot>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-drawer': CtDrawer;
  }
}
