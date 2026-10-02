import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import '../ct-icon';

export interface SelectOption {
  label: string;
  value: string;
  icon?: string;
  image?: string;
}

/**
 * A custom Select/Dropdown component.
 */
@customElement('ct-select')
export class CtSelect extends LitElement {
  @property({ type: String }) label = '';
  @property({ type: String }) value = '';
  @property({ type: Array }) options: SelectOption[] = [];
  @property({ type: String }) error = '';
  @property({ type: Boolean }) disabled = false;

  @state() private _open = false;

  static styles = css`
    :host {
      display: block;
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      margin-bottom: 16px;
      position: relative;
    }

    .select-container {
      position: relative;
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      border: 1px solid var(--ct-border-color, #333333);
      border-radius: var(--ct-radius-md, 8px);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      cursor: pointer;
      min-height: 56px;
    }

    .select-container:hover:not(.disabled) {
      border-color: var(--ct-text-secondary);
    }

    .select-container.open {
      border-color: var(--ct-color-primary, #00E5FF);
      box-shadow: 0 0 0 1px var(--ct-color-primary, #00E5FF), 0 0 8px rgba(0, 229, 255, 0.2);
    }

    .select-container.error {
      border-color: var(--ct-color-error, #F44336);
    }

    .select-container.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .value-display {
      width: 100%;
      color: var(--ct-text-primary);
      font-size: 16px;
      padding: 24px 48px 8px 16px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .select-container:not(.has-label) .value-display {
      padding: 16px 48px 16px 16px;
    }

    .label {
      position: absolute;
      left: 16px;
      top: 16px;
      color: var(--ct-text-secondary, #B3B3B3);
      font-size: 16px;
      pointer-events: none;
      transition: all 0.2s ease;
      transform-origin: left top;
    }

    .select-container.open .label,
    .select-container.has-value .label {
      transform: translateY(-10px) scale(0.75);
      color: var(--ct-color-primary, #00E5FF);
    }

    .select-container:not(.open).has-value .label {
      color: var(--ct-text-secondary, #B3B3B3);
    }

    .chevron {
      position: absolute;
      right: 16px;
      color: var(--ct-text-secondary, #B3B3B3);
      transition: transform 0.3s ease;
    }

    .select-container.open .chevron {
      transform: rotate(180deg);
      color: var(--ct-color-primary, #00E5FF);
    }

    /* Dropdown Menu */
    .dropdown {
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      right: 0;
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      border: 1px solid var(--ct-border-color, #333333);
      border-radius: var(--ct-radius-md, 8px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      z-index: 1000;
      max-height: 250px;
      overflow-y: auto;
      opacity: 0;
      visibility: hidden;
      transform: translateY(-10px);
      transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .dropdown.open {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }

    .option {
      padding: 12px 16px;
      color: var(--ct-text-primary);
      cursor: pointer;
      transition: background 0.2s;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .option:hover {
      background: var(--ct-overlay-hover);
    }

    .option.selected {
      background: color-mix(in srgb, var(--ct-color-primary) 10%, transparent);
      color: var(--ct-color-primary);
    }

    .option-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }

    .option-image {
      width: 24px;
      height: 24px;
      object-fit: contain;
      border-radius: 4px;
    }

    .value-inner {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .error-message {
      color: var(--ct-color-error, #F44336);
      font-size: 12px;
      margin-top: 4px;
      margin-left: 4px;
    }

    /* Backdrop for closing when clicking outside */
    .click-away {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: none;
    }
    
    .click-away.open {
      display: block;
    }
  `;

  private _toggleOpen() {
    if (!this.disabled) {
      this._open = !this._open;
    }
  }

  private _close() {
    this._open = false;
  }

  private _handleSelect(value: string) {
    this.value = value;
    this._open = false;
    this.dispatchEvent(new CustomEvent('ct-change', {
      detail: { value },
      bubbles: true,
      composed: true
    }));
  }

  private _renderOptionMedia(opt: SelectOption) {
    if (opt.image) {
      return html`<img src="${opt.image}" alt="" class="option-image" />`;
    }
    if (opt.icon) {
      return html`<ct-icon name="${opt.icon}" size="20px" color="currentColor" class="option-icon"></ct-icon>`;
    }
    return '';
  }

  private get _safeOptions(): SelectOption[] {
    if (Array.isArray(this.options)) return this.options;
    if (typeof this.options === 'string') {
      try { return JSON.parse(this.options); } catch { return []; }
    }
    return [];
  }

  render() {
    const safeOptions = this._safeOptions;
    const selectedOption = safeOptions.find(opt => opt.value === this.value);
    const hasValue = !!this.value;

    const containerClasses = [
      'select-container',
      this._open ? 'open' : '',
      hasValue ? 'has-value' : '',
      this.error ? 'error' : '',
      this.disabled ? 'disabled' : '',
      this.label ? 'has-label' : ''
    ].join(' ');

    return html`
      <div class="click-away ${this._open ? 'open' : ''}" @click=${this._close}></div>
      <div class="${containerClasses}" @click=${this._toggleOpen} part="container">
        <label class="label" part="label">${this.label}</label>
        <div class="value-display" part="value">
          ${selectedOption ? html`
            <div class="value-inner">
              ${this._renderOptionMedia(selectedOption)}
              <span>${selectedOption.label}</span>
            </div>
          ` : ''}
        </div>
        <div class="chevron">
          <ct-icon name="expand_more" size="20px" color="currentColor"></ct-icon>
        </div>
      </div>
      
      <div class="dropdown ${this._open ? 'open' : ''}" part="dropdown">
        ${safeOptions.map(opt => html`
          <div 
            class="option ${this.value === opt.value ? 'selected' : ''}" 
            @click=${() => this._handleSelect(opt.value)}
            part="option"
          >
            ${this._renderOptionMedia(opt)}
            <span>${opt.label}</span>
          </div>
        `)}
        ${safeOptions.length === 0 ? html`<div class="option" style="color: #757575;">Nenhuma opção</div>` : ''}
      </div>
      
      ${this.error ? html`<div class="error-message" part="error">${this.error}</div>` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-select': CtSelect;
  }
}
