import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A Card component with Glassmorphism support for CashTrack Design System.
 */
@customElement('ct-card')
export class CtCard extends LitElement {
  /**
   * Defines if the card should use the elevated glassmorphism effect
   */
  @property({ type: Boolean }) glass = false;

  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      border-radius: var(--ct-radius-lg, 16px);
      padding: var(--ct-spacing-lg, 24px);
      box-sizing: border-box;
      transition: all 0.3s ease;
      color: var(--ct-text-primary, #FFFFFF);
    }

    /* Glassmorphism style */
    .glass {
      background: rgba(30, 30, 30, 0.6);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
    }
  `;

  render() {
    return html`
      <div class="card ${this.glass ? 'glass' : ''}" part="base">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-card': CtCard;
  }
}
