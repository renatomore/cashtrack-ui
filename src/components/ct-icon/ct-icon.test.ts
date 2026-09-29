import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-icon';

describe('ct-icon', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-icon></ct-icon>`);
    expect(el).toBeDefined();
  });
});
