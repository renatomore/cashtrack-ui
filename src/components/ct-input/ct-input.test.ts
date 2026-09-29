import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-input';
import { CtInput } from './ct-input';

describe('ct-input', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtInput>(html`<ct-input></ct-input>`);
    expect(el).toBeDefined();
  });

  it('handles focus and blur', async () => {
    const el = await fixture<CtInput>(html`<ct-input></ct-input>`);
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.focused')).toBeTruthy();

    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.focused')).toBeFalsy();
  });

  it('emits change event on input', async () => {
    const el = await fixture<CtInput>(html`<ct-input></ct-input>`);
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    let emitted = '';
    el.addEventListener('ct-change', (e: any) => { emitted = e.detail.value; });
    
    input.value = 'test';
    input.dispatchEvent(new Event('input'));
    expect(emitted).toBe('test');
    expect(el.value).toBe('test');
  });

  it('renders error message', async () => {
    const el = await fixture<CtInput>(html`<ct-input error="Required"></ct-input>`);
    const errorMsg = el.shadowRoot!.querySelector('.error-message');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg!.textContent).toBe('Required');
  });
});
