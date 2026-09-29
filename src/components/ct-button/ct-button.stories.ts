import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-button'; // Import the component

const meta: Meta = {
  title: 'Components/CtButton',
  component: 'ct-button',
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'outline'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
    disabled: { control: 'boolean' },
    slot: { control: 'text' },
  },
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#121212' },
        { name: 'light', value: '#FFFFFF' },
      ],
    },
  },
  render: (args: any) => html`
    <style>
      /* Injetando tokens temporários para o Storybook */
      :root {
        --ct-color-primary: #00E5FF;
        --ct-color-primary-hover: #00B8D4;
        --ct-color-secondary: #FFD700;
        --ct-font-family: 'Montserrat', sans-serif;
        --ct-radius-md: 8px;
      }
    </style>
    <ct-button
      variant="${args.variant}"
      size="${args.size}"
      ?disabled="${args.disabled}"
    >
      ${args.slot}
    </ct-button>
  `,
};

export default meta;

type Story = StoryObj;

export const Primary: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    slot: 'Primary Button',
  },
};

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    size: 'medium',
    disabled: false,
    slot: 'Secondary Button',
  },
};

export const Outline: Story = {
  args: {
    variant: 'outline',
    size: 'medium',
    disabled: false,
    slot: 'Outline Button',
  },
};

export const Disabled: Story = {
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: true,
    slot: 'Disabled Button',
  },
};
