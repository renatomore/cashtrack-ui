import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-transaction-item';
import { CtTransactionItem } from './ct-transaction-item';

describe('ct-transaction-item', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtTransactionItem>(html`<ct-transaction-item></ct-transaction-item>`);
    expect(el).toBeDefined();
  });

  it('formats income amount correctly', async () => {
    const el = await fixture<CtTransactionItem>(html`<ct-transaction-item type="income" .amount="${50}"></ct-transaction-item>`);
    const amountEl = el.shadowRoot!.querySelector('.amount');
    expect(amountEl!.textContent).toContain('+');
    expect(amountEl!.textContent?.replace(/\s/g, ' ')).toContain('50,00');
  });

  it('formats expense amount correctly', async () => {
    const el = await fixture<CtTransactionItem>(html`<ct-transaction-item type="expense" .amount="${50}"></ct-transaction-item>`);
    const amountEl = el.shadowRoot!.querySelector('.amount');
    expect(amountEl!.textContent).toContain('-');
    expect(amountEl!.textContent?.replace(/\s/g, ' ')).toContain('50,00');
  });

  it('renders category', async () => {
    const el = await fixture<CtTransactionItem>(html`<ct-transaction-item category="Food"></ct-transaction-item>`);
    const meta = el.shadowRoot!.querySelector('.meta');
    expect(meta!.textContent).toContain('Food');
  });

  it('renders custom icon', async () => {
    const el = await fixture<CtTransactionItem>(html`<ct-transaction-item icon="<svg class='custom'></svg>"></ct-transaction-item>`);
    const iconBox = el.shadowRoot!.querySelector('.icon-box');
    expect(iconBox!.innerHTML).toContain('class="custom"');
  });
});
