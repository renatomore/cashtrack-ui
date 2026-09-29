import { describe, it, expect } from 'vitest';
import { fixture, html } from '@open-wc/testing';
import './ct-select';
import { CtSelect } from './ct-select';

describe('ct-select', () => {
  const options = [{label: 'A', value: 'a'}, {label: 'B', value: 'b'}];

  it('renders correctly', async () => {
    const el = await fixture<CtSelect>(html`<ct-select></ct-select>`);
    expect(el).toBeDefined();
  });

  it('toggles dropdown on click', async () => {
    const el = await fixture<CtSelect>(html`<ct-select></ct-select>`);
    const container = el.shadowRoot!.querySelector('.select-container') as HTMLElement;
    container.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeTruthy();
  });

  it('does not open if disabled', async () => {
    const el = await fixture<CtSelect>(html`<ct-select disabled></ct-select>`);
    const container = el.shadowRoot!.querySelector('.select-container') as HTMLElement;
    container.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeFalsy();
  });

  it('closes when clicking away', async () => {
    const el = await fixture<CtSelect>(html`<ct-select></ct-select>`);
    const container = el.shadowRoot!.querySelector('.select-container') as HTMLElement;
    container.click();
    await el.updateComplete;
    
    const clickAway = el.shadowRoot!.querySelector('.click-away') as HTMLElement;
    clickAway.click();
    await el.updateComplete;
    expect(el.shadowRoot!.querySelector('.dropdown.open')).toBeFalsy();
  });

  it('selects option and emits event', async () => {
    const el = await fixture<CtSelect>(html`<ct-select .options="${options}"></ct-select>`);
    el.shadowRoot!.querySelector('.select-container')!.dispatchEvent(new Event('click'));
    await el.updateComplete;
    
    let emitted = '';
    el.addEventListener('ct-change', (e: any) => { emitted = e.detail.value; });
    
    const optionEls = el.shadowRoot!.querySelectorAll('.option');
    (optionEls[0] as HTMLElement).click();
    
    expect(emitted).toBe('a');
    expect(el.value).toBe('a');
  });

  it('renders no options message', async () => {
    const el = await fixture<CtSelect>(html`<ct-select .options="${[]}"></ct-select>`);
    const optionEls = el.shadowRoot!.querySelectorAll('.option');
    expect(optionEls[0].textContent).toContain('Nenhuma opção');
  });
});
