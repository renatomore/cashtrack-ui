import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-alert';
import { CtAlert } from './ct-alert';

describe('ct-alert', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtAlert>(html`<ct-alert></ct-alert>`);
    expect(el).toBeDefined();
  });

  it('closes when close button is clicked', async () => {
    const el = await fixture<CtAlert>(html`<ct-alert open></ct-alert>`);
    let closed = false;
    el.addEventListener('ct-close', () => { closed = true; });
    const btn = el.shadowRoot!.querySelector('.close-btn') as HTMLElement;
    btn.click();
    expect(el.open).toBe(false);
    expect(closed).toBe(true);
  });
});
