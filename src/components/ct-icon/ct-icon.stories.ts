import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-icon';

const meta: Meta = {
  title: 'Components/CtIcon',
  component: 'ct-icon',
  argTypes: {
    name: { control: 'text' },
    size: { control: 'text' },
    color: { control: 'color' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    name: 'dashboard',
    size: '24px',
    color: 'var(--primary)',
  },
};
