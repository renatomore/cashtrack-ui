import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-sidebar';
import { CtSidebar } from './ct-sidebar';

describe('ct-sidebar', () => {
  const items = [{label: 'Home', href: '/home'}, {label: 'Action'}];

  it('renders correctly', async () => {
    const el = await fixture<CtSidebar>(html`<ct-sidebar></ct-sidebar>`);
    expect(el).toBeDefined();
  });

  it('emits navigate event on item without href', async () => {
    const el = await fixture<CtSidebar>(html`<ct-sidebar .items="${items}"></ct-sidebar>`);
    let emitted = '';
    el.addEventListener('ct-navigate', (e: any) => { emitted = e.detail.label; });
    
    // items[1] has no href, so it renders a button and emits the event
    const links = el.shadowRoot!.querySelectorAll('.nav-item');
    (links[1] as HTMLElement).click();
    
    expect(emitted).toBe('Action');
  });

  it('renders anchor tags for items with href and buttons for items without', async () => {
    const el = await fixture<CtSidebar>(html`<ct-sidebar .items="${items}"></ct-sidebar>`);
    const links = el.shadowRoot!.querySelectorAll('.nav-item');
    
    expect(links[0].tagName.toLowerCase()).toBe('a');
    expect(links[0].getAttribute('href')).toBe('/home');
    
    expect(links[1].tagName.toLowerCase()).toBe('button');
  });

  it('closes mobile drawer on backdrop click', async () => {
    const el = await fixture<CtSidebar>(html`<ct-sidebar mobileOpen></ct-sidebar>`);
    const backdrop = el.shadowRoot!.querySelector('.mobile-backdrop') as HTMLElement;
    backdrop.click();
    expect(el.mobileOpen).toBe(false);
  });

  it('closes mobile drawer on link click in mobile view', async () => {
    // Mock window innerWidth
    Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 500 });
    const el = await fixture<CtSidebar>(html`<ct-sidebar mobileOpen .items="${items}"></ct-sidebar>`);
    
    const links = el.shadowRoot!.querySelectorAll('.nav-item');
    (links[0] as HTMLElement).click();
    
    expect(el.mobileOpen).toBe(false);
  });
});
