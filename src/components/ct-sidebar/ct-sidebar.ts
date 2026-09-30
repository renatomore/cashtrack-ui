import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '../ct-icon';

export interface SidebarItem {
  id?: string;
  label: string;
  icon?: string; // SVG string
  href?: string;
  active?: boolean;
  isSeparator?: boolean;
  external?: boolean;
}

/**
 * A Sidebar navigation component.
 */
@customElement('ct-sidebar')
export class CtSidebar extends LitElement {
  private _items: SidebarItem[] = [];

  @property({ type: Array })
  get items(): SidebarItem[] {
    return this._items;
  }

  set items(val: any) {
    const oldVal = this._items;
    if (typeof val === 'string') {
      try {
        const parsed = JSON.parse(val);
        // Sometimes JSON.parse of a string returns a string or primitive. We strictly need an array.
        this._items = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        this._items = [];
      }
    } else if (Array.isArray(val)) {
      this._items = val;
    } else {
      this._items = [];
    }
    this.requestUpdate('items', oldVal);
  }

  @property({ type: String }) logo = 'CashTrack';
  
  /**
   * For mobile, controls whether it is open as a drawer
   */
  @property({ type: Boolean, reflect: true }) mobileOpen = false;

  static styles = css`
    :host {
      display: block;
      height: 100%;
    }

    .sidebar {
      width: 260px;
      height: 100%;
      background: var(--ct-surface, #1E1E1E);
      backdrop-filter: var(--ct-surface-blur, blur(24px));
      -webkit-backdrop-filter: var(--ct-surface-blur, blur(24px));
      border-right: 1px solid var(--ct-border-color, #333333);
      display: flex;
      flex-direction: column;
      font-family: var(--ct-font-family, 'Montserrat', sans-serif);
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .logo-container {
      padding: 32px 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .logo-text {
      font-size: 24px;
      font-weight: 700;
      color: var(--ct-text-primary);
      margin: 0;
      letter-spacing: -0.5px;
    }

    .logo-text span {
      color: var(--ct-color-primary, #00E5FF);
    }

    .nav {
      flex: 1;
      padding: 0 16px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      overflow-y: auto;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 12px 16px;
      color: var(--ct-text-secondary, #B3B3B3);
      text-decoration: none;
      border-radius: var(--ct-radius-md, 12px);
      transition: all 0.2s;
      font-weight: 500;
      cursor: pointer;
    }

    button.nav-item {
      background: transparent;
      border: none;
      font-family: inherit;
      font-size: inherit;
      text-align: left;
      width: 100%;
    }

    .nav-item:hover {
      background: var(--ct-overlay-hover);
      color: var(--ct-text-primary);
    }

    .nav-item.active {
      background: color-mix(in srgb, var(--ct-color-primary) 10%, transparent);
      color: var(--ct-color-primary);
      font-weight: 600;
    }

    .icon-box {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
    }

    .icon-box svg {
      width: 100%;
      height: 100%;
    }

    .separator {
      margin: 24px 16px 8px 16px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--ct-border-color, #333333);
      color: var(--ct-text-secondary, #B3B3B3);
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }

    /* Mobile behavior */
    @media (max-width: 768px) {
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        z-index: 1000;
        transform: translateX(-100%);
      }

      :host([mobileOpen]) .sidebar {
        transform: translateX(0);
      }

      .mobile-backdrop {
        position: fixed;
        inset: 0;
        background: var(--ct-backdrop, rgba(0, 0, 0, 0.6));
        z-index: 999;
        display: none;
      }

      :host([mobileOpen]) .mobile-backdrop {
        display: block;
      }
    }
  `;

  private _handleNavClick(item: SidebarItem) {
    if (item.isSeparator) return;
    this.dispatchEvent(new CustomEvent('ct-navigate', {
      detail: item,
      bubbles: true,
      composed: true
    }));
    // Close on mobile after click
    if (window.innerWidth <= 768) {
      this.mobileOpen = false;
    }
  }

  private _handleLinkClick() {
    if (window.innerWidth <= 768) {
      this.mobileOpen = false;
    }
  }

  private _renderIcon(item: SidebarItem) {
    return html`
      <div class="icon-box">
        ${item.icon 
          ? (item.icon.includes('<svg') 
              ? html`<span .innerHTML=${item.icon}></span>` 
              : html`<ct-icon name=${item.icon} size="24px" color="currentColor"></ct-icon>`) 
          : html`<ct-icon name="circle" size="24px" color="currentColor"></ct-icon>`
        }
      </div>
    `;
  }

  render() {
    return html`
      <div class="mobile-backdrop" @click=${() => this.mobileOpen = false}></div>
      <aside class="sidebar" part="base">
        <div class="logo-container">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="var(--ct-color-primary, #00E5FF)"/>
            <path d="M2 17L12 22L22 17" stroke="var(--ct-color-primary, #00E5FF)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M2 12L12 17L22 12" stroke="var(--ct-color-primary, #00E5FF)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <h1 class="logo-text">Cash<span>Track</span></h1>
        </div>
        
        <nav class="nav">
          ${(this.items || []).map(item => {
            if (item.isSeparator) {
              return html`<div class="separator">${item.label}</div>`;
            }
            if (item.href) {
              return html`
                <a 
                  class="nav-item ${item.active ? 'active' : ''}" 
                  href=${item.href}
                  target=${item.external ? '_blank' : '_self'}
                  rel=${item.external ? 'noopener noreferrer' : ''}
                  @click=${this._handleLinkClick}
                  part="nav-item ${item.active ? 'nav-item-active' : ''}"
                >
                  ${this._renderIcon(item)}
                  ${item.label}
                </a>
              `;
            } else {
              return html`
                <button 
                  class="nav-item ${item.active ? 'active' : ''}" 
                  @click=${() => this._handleNavClick(item)}
                  part="nav-item ${item.active ? 'nav-item-active' : ''}"
                >
                  ${this._renderIcon(item)}
                  ${item.label}
                </button>
              `;
            }
          })}
        </nav>
      </aside>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ct-sidebar': CtSidebar;
  }
}
