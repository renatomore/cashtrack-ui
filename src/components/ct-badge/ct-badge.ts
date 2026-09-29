import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

/**
 * A Badge component for the CashTrack Design System.
 */
@customElement('ct-badge')
export class CtBadge extends LitElement {
  @property({ type: String }) variant: BadgeVariant = 'default';

  static styles = css`
    :host {
      display: inline-block;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      padding: 4px 8px;
      border-radius: 12px;
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      white-space: nowrap;
    }

    .variant-success {
      background: rgba(76, 175, 80, 0.15);
      color: #4CAF50;
      border: 1px solid rgba(76, 175, 80, 0.3);
    }

    .variant-error {
      background: rgba(244, 67, 54, 0.15);
      color: #F44336;
      border: 1px solid rgba(244, 67, 54, 0.3);
    }

    .variant-warning {
      background: rgba(255, 152, 0, 0.15);
      color: #FF9800;
      border: 1px solid rgba(255, 152, 0, 0.3);
    }

    .variant-info {
      background: rgba(0, 229, 255, 0.15);
      color: #00E5FF;
      border: 1px solid rgba(0, 229, 255, 0.3);
    }

    .variant-default {
      background: rgba(255, 255, 255, 0.1);
      color: #B3B3B3;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  `;

  render() {
    return html`
      <span class="badge variant-${this.variant}" part="base">
        <slot></slot>
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-badge': CtBadge;
  }
}
