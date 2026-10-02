import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-datepicker';
import { CtDatepicker } from './ct-datepicker';

describe('ct-datepicker', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtDatepicker>(html`<ct-datepicker></ct-datepicker>`);
    expect(el).toBeDefined();
  });

  it('handles focus and blur', async () => {
    const el = await fixture<CtDatepicker>(html`<ct-datepicker></ct-datepicker>`);
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.dispatchEvent(new Event('focus'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.focused')).toBeTruthy();

    input.dispatchEvent(new Event('blur'));
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.focused')).toBeFalsy();
  });

  it('emits change event on input', async () => {
    const el = await fixture<CtDatepicker>(html`<ct-datepicker></ct-datepicker>`);
    const input = el.shadowRoot!.querySelector('input') as HTMLInputElement;
    let emitted = '';
    el.addEventListener('ct-change', (e: any) => { emitted = e.detail.value; });
    
    input.value = '02102026'; // which formats to 02/10/2026
    input.dispatchEvent(new Event('input'));
    expect(emitted).toBe('2026-10-02');
    expect(el.value).toBe('2026-10-02');
  });

  it('renders error message', async () => {
    const el = await fixture<CtDatepicker>(html`<ct-datepicker error="Required"></ct-datepicker>`);
    const errorMsg = el.shadowRoot!.querySelector('.error-message');
    expect(errorMsg).toBeTruthy();
    expect(errorMsg!.textContent).toBe('Required');
  });
});
