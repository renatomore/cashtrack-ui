import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-badge';

const meta: Meta = {
  title: 'Components/CtBadge',
  component: 'ct-badge',
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'default'],
    },
    content: { control: 'text' },
  },
  render: (args) => html`<ct-badge variant="${args.variant}">${args.content}</ct-badge>`,
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  args: {
    variant: 'success',
    content: '+ Receita',
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    content: '- Despesa',
  },
};
