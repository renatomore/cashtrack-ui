import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-drawer';
import { CtDrawer } from './ct-drawer';

describe('ct-drawer', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtDrawer>(html`<ct-drawer></ct-drawer>`);
    expect(el).toBeDefined();
  });

  it('closes on close button click', async () => {
    const el = await fixture<CtDrawer>(html`<ct-drawer open></ct-drawer>`);
    let closed = false;
    el.addEventListener('ct-close', () => { closed = true; });
    const btn = el.shadowRoot!.querySelector('.close-btn') as HTMLElement;
    btn.click();
    expect(el.open).toBe(false);
    expect(closed).toBe(true);
  });

  it('closes on backdrop click', async () => {
    const el = await fixture<CtDrawer>(html`<ct-drawer open></ct-drawer>`);
    let closed = false;
    el.addEventListener('ct-close', () => { closed = true; });
    const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
    backdrop.click();
    expect(el.open).toBe(false);
    expect(closed).toBe(true);
  });
});
