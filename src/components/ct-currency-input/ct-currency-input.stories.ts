import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-currency-input';

const meta: Meta = {
  title: 'Components/CtCurrencyInput',
  component: 'ct-currency-input',
  argTypes: {
    label: { control: 'text' },
    value: { control: 'number' },
    error: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Valor da Transação',
    value: 1250.5,
  },
};

export const WithError: Story = {
  args: {
    label: 'Valor da Transação',
    value: 0,
    error: 'O valor deve ser maior que zero',
  },
};
