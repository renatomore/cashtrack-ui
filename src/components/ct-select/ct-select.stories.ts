import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-select';

const meta: Meta = {
  title: 'Components/CtSelect',
  component: 'ct-select',
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    disabled: { control: 'boolean' },
  },
  render: (args) => html`
    <div style="height: 300px;">
      <ct-select 
        label="${args.label}" 
        .value="${args.value}"
        ?disabled="${args.disabled}"
        .options="${[
          { label: 'Alimentação', value: 'food' },
          { label: 'Transporte', value: 'transport' },
          { label: 'Moradia', value: 'housing' },
          { label: 'Lazer', value: 'entertainment' }
        ]}">
      </ct-select>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Categoria',
    value: '',
    disabled: false,
  },
};

export const PreSelected: Story = {
  args: {
    label: 'Categoria',
    value: 'transport',
    disabled: false,
  },
};
