import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-datepicker';

const meta: Meta = {
  title: 'Components/CtDatepicker',
  component: 'ct-datepicker',
  argTypes: {
    label: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'text' },
    min: { control: 'text' },
    max: { control: 'text' },
    disabled: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Data da Transação',
    value: '',
  },
};

export const Filled: Story = {
  args: {
    label: 'Data de Nascimento',
    value: '2000-01-01',
  },
};

export const MinMax: Story = {
  args: {
    label: 'Agendamento (apenas Out/2026)',
    value: '2026-10-15',
    min: '2026-10-01',
    max: '2026-10-31',
  },
};

export const Error: Story = {
  args: {
    label: 'Data de Vencimento',
    value: '2026-09-01',
    error: 'A data não pode estar no passado',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Data de Fechamento',
    value: '2026-09-30',
    disabled: true,
  },
};
