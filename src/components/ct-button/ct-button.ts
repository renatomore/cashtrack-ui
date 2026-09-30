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
      color: #FFFFFF; /* Keep white for primary since it has a solid colorful background */
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

    /* Secondary Variant (Pure Glassmorphism) */
    .variant-secondary {
      background: var(--ct-overlay-hover);
      color: var(--ct-text-primary);
      border: 1px solid var(--ct-border-color);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .variant-secondary:hover:not(:disabled) {
      background: var(--ct-overlay-active);
      border-color: var(--ct-color-primary);
      transform: translateY(-1px);
    }

    /* Tonal Variant (Muted Primary Glass) */
    .variant-tonal {
      background: rgba(0, 229, 255, 0.15);
      color: var(--ct-color-primary, #00E5FF);
    }
    .variant-tonal:hover:not(:disabled) {
      background: rgba(0, 229, 255, 0.25);
      transform: translateY(-1px);
    }

    /* Neon Variant (Cyber Neon Glow) */
    .variant-neon {
      background: transparent;
      color: var(--ct-color-primary, #00E5FF);
      border: 1px solid var(--ct-color-primary, #00E5FF);
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.2), inset 0 0 10px rgba(0, 229, 255, 0.1);
      text-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
    }
    .variant-neon:hover:not(:disabled) {
      box-shadow: 0 0 20px rgba(0, 229, 255, 0.4), inset 0 0 15px rgba(0, 229, 255, 0.2);
      background: rgba(0, 229, 255, 0.05);
      transform: translateY(-1px);
    }

    /* Neumorph Variant (Dark Neumorphism) */
    .variant-neumorph {
      background: var(--ct-surface);
      color: var(--ct-text-primary);
      box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.2), -2px -2px 8px var(--ct-overlay-hover);
      border: 1px solid var(--ct-border-color);
      backdrop-filter: var(--ct-surface-blur);
      -webkit-backdrop-filter: var(--ct-surface-blur);
    }
    .variant-neumorph:hover:not(:disabled) {
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3), -1px -1px 4px var(--ct-overlay-hover);
      transform: translateY(1px);
    }

    .variant-outline {
      background-color: transparent;
      color: var(--ct-text-primary);
      border: 1px solid var(--ct-border-color);
      box-shadow: inset 0 1px 0 var(--ct-overlay-hover);
    }

    .variant-outline:hover:not(:disabled) {
      background-color: var(--ct-overlay-hover);
      border-color: var(--ct-color-primary);
      transform: translateY(-1px);
    }

    .variant-text {
      background-color: transparent;
      color: var(--ct-text-primary);
      padding: 8px; /* Override sizes for icon/text balance */
      min-width: 40px;
    }

    .variant-text:hover:not(:disabled) {
      background-color: var(--ct-overlay-hover);
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
