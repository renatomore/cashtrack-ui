import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TypographyVariant = 'h1' | 'h2' | 'h3' | 'body1' | 'body2' | 'caption';
export type TypographyColor = 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' | 'success';

/**
 * A Typography component for standardizing text across the CashTrack Design System.
 */
@customElement('ct-typography')
export class CtTypography extends LitElement {
  @property({ type: String }) variant: TypographyVariant = 'body1';
  @property({ type: String }) color: TypographyColor = 'textPrimary';

  static styles = css`
    :host {
      display: block;
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
    }

    .typography {
      margin: 0;
      padding: 0;
      transition: color 0.3s ease;
    }

    /* Colors */
    .color-primary { color: var(--ct-color-primary, #00E5FF); }
    .color-secondary { color: var(--ct-color-secondary, #FFD700); }
    .color-textPrimary { color: var(--ct-text-primary, #FFFFFF); }
    .color-textSecondary { color: var(--ct-text-secondary, #B3B3B3); }
    .color-error { color: var(--ct-color-error, #F44336); }
    .color-success { color: var(--ct-color-success, #4CAF50); }

    /* Variants with Responsive Scaling */
    .variant-h1 {
      font-size: clamp(28px, 5vw, 36px);
      font-weight: 700;
      line-height: 1.2;
    }

    .variant-h2 {
      font-size: clamp(22px, 4vw, 28px);
      font-weight: 600;
      line-height: 1.3;
    }

    .variant-h3 {
      font-size: clamp(18px, 3vw, 22px);
      font-weight: 600;
      line-height: 1.4;
    }

    .variant-body1 {
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
    }

    .variant-body2 {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.5;
    }

    .variant-caption {
      font-size: 12px;
      font-weight: 400;
      line-height: 1.4;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `;

  render() {
    const classes = `typography variant-${this.variant} color-${this.color}`;

    switch (this.variant) {
      case 'h1': return html`<h1 class="${classes}"><slot></slot></h1>`;
      case 'h2': return html`<h2 class="${classes}"><slot></slot></h2>`;
      case 'h3': return html`<h3 class="${classes}"><slot></slot></h3>`;
      default: return html`<p class="${classes}"><slot></slot></p>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-typography': CtTypography;
  }
}
