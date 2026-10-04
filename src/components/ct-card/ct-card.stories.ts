import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-card';

const meta: Meta = {
  title: 'Components/CtCard',
  component: 'ct-card',
  render: (args) => html`
    <ct-card style="width: 300px;" ?glass=${args.glass} ?glowingCard=${args.glowingCard}>
      <h3 style="margin-top: 0; margin-bottom: 8px;">Resumo Mensal</h3>
      <p style="color: var(--ct-text-secondary, #B3B3B3); margin: 0;">Acompanhe seus gastos do mês atual.</p>
    </ct-card>
  `,
  argTypes: {
    glass: { control: 'boolean' },
    glowingCard: { control: 'boolean' },
  }
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    glass: false,
    glowingCard: false,
  }
};

export const Glassmorphism: Story = {
  args: {
    glass: true,
    glowingCard: false,
  }
};

export const GlowingCard: Story = {
  args: {
    glass: true,
    glowingCard: true,
  }
};
