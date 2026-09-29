import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-input';

const meta: Meta = {
  title: 'Components/CtInput',
  component: 'ct-input',
  argTypes: {
    label: { control: 'text' },
    type: { control: 'text' },
    value: { control: 'text' },
    error: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    label: 'Nome da Transação',
    type: 'text',
    value: '',
  },
};

export const Filled: Story = {
  args: {
    label: 'E-mail',
    type: 'email',
    value: 'usuario@cashtrack.com',
  },
};

export const Error: Story = {
  args: {
    label: 'Senha',
    type: 'password',
    value: '123',
    error: 'A senha é muito fraca',
  },
};
