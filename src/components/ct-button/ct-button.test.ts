import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-button';

describe('ct-button', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-button></ct-button>`);
    expect(el).toBeDefined();
  });
});
