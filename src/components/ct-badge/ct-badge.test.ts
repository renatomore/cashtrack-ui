import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-badge';

describe('ct-badge', () => {
  it('renders correctly', async () => {
    const el = await fixture(html`<ct-badge></ct-badge>`);
    expect(el).toBeDefined();
  });
});
