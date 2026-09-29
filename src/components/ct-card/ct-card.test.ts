import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-card';
import { CtCard } from './ct-card';

describe('ct-card', () => {
  it('renders correctly', async () => {
    const el = await fixture<CtCard>(html`<ct-card></ct-card>`);
    expect(el).toBeDefined();
  });

  it('renders children via slot', async () => {
    const el = await fixture<CtCard>(html`<ct-card><p>Content</p></ct-card>`);
    const slot = el.shadowRoot!.querySelector('slot');
    expect(slot).toBeTruthy();
  });
});
