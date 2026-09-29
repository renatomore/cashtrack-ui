import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A wrapper for Google Material Symbols.
 */
@customElement('ct-icon')
export class CtIcon extends LitElement {
  @property({ type: String }) name = '';
  @property({ type: String }) size = '24px';
  @property({ type: String }) color = 'inherit';

  static styles = css`
    :host {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      vertical-align: middle;
    }

    /* We need to import the font inside the Shadow DOM or rely on the light DOM cascading font if not isolated, but Material Symbols use a specific font family. */
    @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200');

    .material-symbols-outlined {
      font-family: 'Material Symbols Outlined', sans-serif;
      font-weight: normal;
      font-style: normal;
      font-size: 24px;
      line-height: 1;
      letter-spacing: normal;
      text-transform: none;
      display: inline-block;
      white-space: nowrap;
      word-wrap: normal;
      direction: ltr;
      -webkit-font-feature-settings: 'liga';
      -webkit-font-smoothing: antialiased;
    }
  `;

  render() {
    return html`
      <span 
        class="material-symbols-outlined" 
        style="font-size: ${this.size}; color: ${this.color};"
        part="icon"
      >
        ${this.name}
      </span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-icon': CtIcon;
  }
}
