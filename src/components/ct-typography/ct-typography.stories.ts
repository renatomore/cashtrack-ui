import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-typography';

const meta: Meta = {
  title: 'Components/CtTypography',
  component: 'ct-typography',
  argTypes: {
    variant: { control: 'select', options: ['h1', 'h2', 'h3', 'body1', 'body2', 'caption'] },
    color: { control: 'color' },
  },
  render: (args) => html`
    <ct-typography variant="${args.variant}" color="${args.color || 'var(--text-primary)'}">
      O rápido raposo marrom salta sobre o cão preguiçoso
    </ct-typography>
  `,
};

export default meta;
type Story = StoryObj;

export const Heading1: Story = { args: { variant: 'h1' } };
export const Heading2: Story = { args: { variant: 'h2' } };
export const Heading3: Story = { args: { variant: 'h3' } };
export const Body: Story = { args: { variant: 'body1' } };
export const Caption: Story = { args: { variant: 'caption', color: 'var(--text-secondary)' } };
