import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-alert';

const meta: Meta = {
  title: 'Components/CtAlert',
  component: 'ct-alert',
  argTypes: {
    variant: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info'],
    },
    message: { control: 'text' },
    open: { control: 'boolean' },
    position: { control: 'select', options: ['left', 'center', 'right'] }
  },
  render: (args) => html`<ct-alert variant="${args.variant}" ?open="${args.open}" position="${args.position}">${args.message}</ct-alert>`,
};

export default meta;
type Story = StoryObj;

export const Success: Story = {
  args: {
    variant: 'success',
    message: 'Transação salva com sucesso!',
    open: true,
    position: 'right'
  },
};

export const Error: Story = {
  args: {
    variant: 'error',
    message: 'Erro ao conectar no servidor.',
    open: true,
    position: 'right'
  },
};
