import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-transaction-item';

const meta: Meta = {
  title: 'Components/CtTransactionItem',
  component: 'ct-transaction-item',
  argTypes: {
    type: { control: 'select', options: ['income', 'expense'] },
    amount: { control: 'number' },
    category: { control: 'text' },
    date: { control: 'text' },
    titleText: { control: 'text' },
  },
  render: (args) => html`
    <div style="max-width: 500px; padding: 20px; background: var(--bg-primary);">
      <ct-transaction-item
        type="${args.type}"
        amount="${args.amount}"
        category="${args.category}"
        date="${args.date}">
        ${args.titleText}
      </ct-transaction-item>
    </div>
  `,
};

export default meta;
type Story = StoryObj;

export const Income: Story = {
  args: {
    type: 'income',
    amount: 12500,
    category: 'Salário',
    date: '10 Out 2026',
    titleText: 'Salário Mensal',
  },
};

export const Expense: Story = {
  args: {
    type: 'expense',
    amount: 150.75,
    category: 'Alimentação',
    date: '12 Out 2026',
    titleText: 'Supermercado',
  },
};
