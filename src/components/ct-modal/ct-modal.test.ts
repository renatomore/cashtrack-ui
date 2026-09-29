import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-modal';
import { CtModal } from './ct-modal';

describe('ct-modal', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtModal>(html`<ct-modal></ct-modal>`);
    expect(el).toBeDefined();
  });

  it('closes on close button click', async () => {
    const el = await fixture<CtModal>(html`<ct-modal open></ct-modal>`);
    let closed = false;
    el.addEventListener('ct-close', () => { closed = true; });
    const btn = el.shadowRoot!.querySelector('.close-btn') as HTMLElement;
    btn.click();
    expect(el.open).toBe(false);
    expect(closed).toBe(true);
  });

  it('closes on backdrop click if not disabled', async () => {
    const el = await fixture<CtModal>(html`<ct-modal open></ct-modal>`);
    const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
    backdrop.dispatchEvent(new MouseEvent('click'));
    expect(el.open).toBe(false);
  });

  it('does not close on backdrop click if disabled', async () => {
    const el = await fixture<CtModal>(html`<ct-modal open disableBackdropClick></ct-modal>`);
    const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
    backdrop.dispatchEvent(new MouseEvent('click'));
    expect(el.open).toBe(true);
  });

  it('does not close if click is inside modal content', async () => {
    const el = await fixture<CtModal>(html`<ct-modal open></ct-modal>`);
    const backdrop = el.shadowRoot!.querySelector('.backdrop') as HTMLElement;
    const modal = el.shadowRoot!.querySelector('.modal') as HTMLElement;
    
    // Simulate click bubbling from inside
    const e = new MouseEvent('click');
    Object.defineProperty(e, 'target', { value: modal });
    backdrop.dispatchEvent(e);
    
    expect(el.open).toBe(true);
  });
});
