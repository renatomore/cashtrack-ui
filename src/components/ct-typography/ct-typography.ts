import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

export type TypographyVariant = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
export type TypographyColor = 'primary' | 'secondary' | 'textPrimary' | 'textSecondary' | 'error' | 'success';

/**
 * A Typography component for standardizing text across the CashTrack Design System.
 */
@customElement('ct-typography')
export class CtTypography extends LitElement {
  @property({ type: String }) variant: TypographyVariant = 'base';
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

    /* Variants with T-Shirt Scaling */
    .variant-4xl {
      font-size: var(--ct-text-4xl, 36px);
      font-weight: 700;
      line-height: var(--ct-line-height-tight, 1.2);
    }

    .variant-3xl {
      font-size: var(--ct-text-3xl, 30px);
      font-weight: 600;
      line-height: var(--ct-line-height-tight, 1.2);
    }

    .variant-2xl {
      font-size: var(--ct-text-2xl, 24px);
      font-weight: 600;
      line-height: var(--ct-line-height-tight, 1.2);
    }

    .variant-xl {
      font-size: var(--ct-text-xl, 20px);
      font-weight: 600;
      line-height: var(--ct-line-height-tight, 1.2);
    }

    .variant-lg {
      font-size: var(--ct-text-lg, 18px);
      font-weight: 500;
      line-height: var(--ct-line-height-normal, 1.5);
    }

    .variant-base {
      font-size: var(--ct-text-base, 16px);
      font-weight: 400;
      line-height: var(--ct-line-height-normal, 1.5);
    }

    .variant-sm {
      font-size: var(--ct-text-sm, 14px);
      font-weight: 500;
      line-height: var(--ct-line-height-normal, 1.5);
    }

    .variant-xs {
      font-size: var(--ct-text-xs, 12px);
      font-weight: 400;
      line-height: var(--ct-line-height-normal, 1.5);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  `;

  render() {
    const classes = `typography variant-${this.variant} color-${this.color}`;

    switch (this.variant) {
      case '4xl':
      case '3xl': return html`<h1 class="${classes}"><slot></slot></h1>`;
      case '2xl': return html`<h2 class="${classes}"><slot></slot></h2>`;
      case 'xl':
      case 'lg': return html`<h3 class="${classes}"><slot></slot></h3>`;
      default: return html`<p class="${classes}"><slot></slot></p>`;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-typography': CtTypography;
  }
}
