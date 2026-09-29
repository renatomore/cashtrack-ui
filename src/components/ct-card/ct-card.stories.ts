import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-card';

const meta: Meta = {
  title: 'Components/CtCard',
  component: 'ct-card',
  render: () => html`
    <ct-card style="width: 300px;">
      <h3 style="margin-top: 0;">Resumo Mensal</h3>
      <p style="color: var(--text-secondary);">Acompanhe seus gastos do mês atual.</p>
    </ct-card>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};
