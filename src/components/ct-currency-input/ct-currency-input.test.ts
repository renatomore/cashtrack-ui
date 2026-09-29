import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-currency-input';
import { CtCurrencyInput } from './ct-currency-input';

describe('ct-currency-input', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtCurrencyInput>(html`<ct-currency-input></ct-currency-input>`);
    expect(el).toBeDefined();
  });

  it('formats initial value correctly', async () => {
    const el = await fixture<CtCurrencyInput>(html`<ct-currency-input .value="${1250.5}"></ct-currency-input>`);
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('ct-input') as any;
    expect(input.value.replace(/\s/g, ' ')).toContain('1.250,50');
  });

  it('updates display value when value property changes', async () => {
    const el = await fixture<CtCurrencyInput>(html`<ct-currency-input></ct-currency-input>`);
    el.value = 50;
    await el.updateComplete;
    const input = el.shadowRoot!.querySelector('ct-input') as any;
    expect(input.value.replace(/\s/g, ' ')).toContain('50,00');
  });

  it('parses input and emits raw value', async () => {
    const el = await fixture<CtCurrencyInput>(html`<ct-currency-input></ct-currency-input>`);
    let emittedValue: number | null = null;
    el.addEventListener('ct-change', (e: any) => { emittedValue = e.detail.value; });
    
    const input = el.shadowRoot!.querySelector('ct-input') as any;
    input.dispatchEvent(new CustomEvent('ct-change', { detail: { value: 'R$ 1.500,00' }}));
    
    expect(emittedValue).toBe(1500);
    expect(el.value).toBe(1500);
  });

  it('handles empty input', async () => {
    const el = await fixture<CtCurrencyInput>(html`<ct-currency-input></ct-currency-input>`);
    const input = el.shadowRoot!.querySelector('ct-input') as any;
    input.dispatchEvent(new CustomEvent('ct-change', { detail: { value: '' }}));
    expect(el.value).toBe(0);
  });
});
