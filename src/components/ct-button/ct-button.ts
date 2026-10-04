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
      background: linear-gradient(180deg, #0093A8 0%, #006073 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 147, 168, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }

    .variant-primary:hover:not(:disabled) {
      background: linear-gradient(180deg, #00A4BB 0%, #00738A 100%);
      box-shadow: 0 6px 16px rgba(0, 147, 168, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }

    .variant-primary:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba(0, 147, 168, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    /* Secondary Variant (Pure Glassmorphism) */
    .variant-secondary {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
      color: var(--ct-text-primary);
      border: 1px solid var(--ct-border-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }
    .variant-secondary:hover:not(:disabled) {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.04) 100%);
      border-color: rgba(255, 255, 255, 0.2);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      transform: translateY(-1px);
    }
    .variant-secondary:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    /* Tonal Variant (Muted Primary Glass) */
    .variant-tonal {
      background: linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(0, 229, 255, 0.08) 100%);
      color: var(--ct-color-primary, #00E5FF);
      border: 1px solid rgba(0, 229, 255, 0.1);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
    .variant-tonal:hover:not(:disabled) {
      background: linear-gradient(180deg, rgba(0, 229, 255, 0.3) 0%, rgba(0, 229, 255, 0.12) 100%);
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
    .variant-tonal:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1), inset 0 2px 4px rgba(0, 0, 0, 0.15);
    }

    /* Neon Variant (Cyber Neon Glow) */
    .variant-neon {
      background: linear-gradient(180deg, rgba(0, 229, 255, 0.05) 0%, transparent 100%);
      color: var(--ct-color-primary, #00E5FF);
      border: 1px solid var(--ct-color-primary, #00E5FF);
      box-shadow: 0 0 10px rgba(0, 229, 255, 0.2), inset 0 0 10px rgba(0, 229, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15);
      text-shadow: 0 0 8px rgba(0, 229, 255, 0.5);
    }
    .variant-neon:hover:not(:disabled) {
      box-shadow: 0 0 20px rgba(0, 229, 255, 0.4), inset 0 0 15px rgba(0, 229, 255, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      background: linear-gradient(180deg, rgba(0, 229, 255, 0.1) 0%, rgba(0, 229, 255, 0.02) 100%);
      transform: translateY(-1px);
    }
    .variant-neon:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 0 5px rgba(0, 229, 255, 0.3), inset 0 0 8px rgba(0, 229, 255, 0.4);
    }

    /* Neumorph Variant (Dark Neumorphism) */
    .variant-neumorph {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%), var(--ct-surface);
      color: var(--ct-text-primary);
      box-shadow: 6px 6px 12px rgba(0, 0, 0, 0.3), -2px -2px 8px rgba(255, 255, 255, 0.03), inset 0 1px 0 rgba(255, 255, 255, 0.05);
      border: 1px solid var(--ct-border-color);
      backdrop-filter: var(--ct-surface-blur);
      -webkit-backdrop-filter: var(--ct-surface-blur);
    }
    .variant-neumorph:hover:not(:disabled) {
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.4), -1px -1px 4px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.08);
      transform: translateY(1px);
    }
    .variant-neumorph:active:not(:disabled) {
      box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.5), inset -2px -2px 6px rgba(255, 255, 255, 0.02);
      transform: translateY(2px);
    }

    .variant-outline {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%);
      color: var(--ct-text-primary);
      border: 1px solid var(--ct-border-color);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.05);
    }
    .variant-outline:hover:not(:disabled) {
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%);
      border-color: rgba(255, 255, 255, 0.2);
      transform: translateY(-1px);
    }
    .variant-outline:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .variant-text {
      background-color: transparent;
      color: var(--ct-text-primary);
      padding: 8px; /* Override sizes for icon/text balance */
      min-width: 40px;
    }
    .variant-text:hover:not(:disabled) {
      background-color: var(--ct-overlay-hover);
      transform: translateY(-1px);
    }
    .variant-text:active:not(:disabled) {
      transform: translateY(1px);
      background-color: rgba(255, 255, 255, 0.1);
    }

    /* Ghost Variant (Transparent Glass) */
    .variant-ghost {
      background-color: transparent;
      color: var(--ct-text-primary);
      border: 1px solid transparent;
    }
    .variant-ghost:hover:not(:disabled) {
      background-color: rgba(255, 255, 255, 0.05);
      border-color: rgba(255, 255, 255, 0.1);
      transform: translateY(-1px);
    }
    .variant-ghost:active:not(:disabled) {
      transform: translateY(1px);
      background-color: rgba(255, 255, 255, 0.08);
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    /* Danger Variant */
    .variant-danger {
      background: linear-gradient(180deg, #ff4d4d 0%, #cc0000 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(255, 77, 77, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    .variant-danger:hover:not(:disabled) {
      background: linear-gradient(180deg, #ff6666 0%, #e60000 100%);
      box-shadow: 0 6px 16px rgba(255, 77, 77, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
    .variant-danger:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba(204, 0, 0, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.3);
    }

    /* Success Variant */
    .variant-success {
      background: linear-gradient(180deg, #00c853 0%, #009624 100%);
      color: #FFFFFF;
      box-shadow: 0 4px 12px rgba(0, 200, 83, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    }
    .variant-success:hover:not(:disabled) {
      background: linear-gradient(180deg, #00e676 0%, #00a32e 100%);
      box-shadow: 0 6px 16px rgba(0, 200, 83, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.3);
      transform: translateY(-1px);
    }
    .variant-success:active:not(:disabled) {
      transform: translateY(1px);
      box-shadow: 0 2px 4px rgba(0, 150, 36, 0.3), inset 0 2px 4px rgba(0, 0, 0, 0.3);
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
