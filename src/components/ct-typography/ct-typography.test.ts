import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-typography';
import { CtTypography } from './ct-typography';

describe('ct-typography', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtTypography>(html`<ct-typography></ct-typography>`);
    expect(el).toBeDefined();
  });

  it('renders h1 variant', async () => {
    const el = await fixture<CtTypography>(html`<ct-typography variant="4xl"></ct-typography>`);
    const h1 = el.shadowRoot!.querySelector('h1');
    expect(h1).toBeTruthy();
  });

  it('renders h2 variant', async () => {
    const el = await fixture<CtTypography>(html`<ct-typography variant="3xl"></ct-typography>`);
    const h2 = el.shadowRoot!.querySelector('h2');
    expect(h2).toBeTruthy();
  });

  it('renders h3 variant', async () => {
    const el = await fixture<CtTypography>(html`<ct-typography variant="2xl"></ct-typography>`);
    const h3 = el.shadowRoot!.querySelector('h3');
    expect(h3).toBeTruthy();
  });

  it('renders body variant as p', async () => {
    const el = await fixture<CtTypography>(html`<ct-typography variant="base"></ct-typography>`);
    const p = el.shadowRoot!.querySelector('p');
    expect(p).toBeTruthy();
  });
});
