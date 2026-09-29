import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A basic button component for the CashTrack Design System.
 */
@customElement('ct-button')
export class CtButton extends LitElement {
  /**
   * The variant of the button (primary, secondary, outline)
   */
  @property({ type: String }) variant = 'primary';

  /**
   * The size of the button (small, medium, large)
   */
  @property({ type: String }) size = 'medium';

  /**
   * Optional disabled state
   */
  @property({ type: Boolean }) disabled = false;

  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      font-weight: 600;
      border: none;
      border-radius: var(--ct-radius-md, 8px);
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-in-out;
      box-sizing: border-box;
    }

    button:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    /* Sizes */
    .size-small {
      padding: 8px 16px;
      font-size: 14px;
    }

    .size-medium {
      padding: 12px 24px;
      font-size: 16px;
    }

    .size-large {
      padding: 16px 32px;
      font-size: 18px;
    }

    /* Variants */
    .variant-primary {
      background: linear-gradient(180deg, var(--ct-color-primary, #00E5FF) 0%, var(--ct-color-primary-hover, #00B8D4) 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 229, 255, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.4);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .variant-primary:hover:not(:disabled) {
      box-shadow: 0 6px 16px rgba(0, 229, 255, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5);
      transform: translateY(-1px);
      filter: brightness(1.1);
    }

    .variant-primary:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba(0, 229, 255, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .variant-secondary {
      background: rgba(255, 215, 0, 0.05);
      color: var(--ct-color-secondary, #FFD700);
      border: 1px solid var(--ct-color-secondary, #FFD700);
      box-shadow: 0 0 8px rgba(255, 215, 0, 0.1), inset 0 0 8px rgba(255, 215, 0, 0.05);
    }

    .variant-secondary:hover:not(:disabled) {
      background: rgba(255, 215, 0, 0.1);
      box-shadow: 0 0 12px rgba(255, 215, 0, 0.2), inset 0 0 12px rgba(255, 215, 0, 0.1);
      text-shadow: 0 0 8px rgba(255, 215, 0, 0.4);
      transform: translateY(-1px);
    }

    .variant-outline {
      background-color: transparent;
      color: var(--ct-text-primary, #FFFFFF);
      border: 1px solid rgba(255, 255, 255, 0.15);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }

    .variant-outline:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
  `;

  render() {
    return html`
      <button
        class="variant-${this.variant} size-${this.size}"
        ?disabled=${this.disabled}
        part="button"
      >
        <slot></slot>
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-button': CtButton;
  }
}
