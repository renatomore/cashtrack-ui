import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-modal';
import '../ct-button';

const meta: Meta = {
  title: 'Components/CtModal',
  component: 'ct-modal',
  argTypes: {
    open: { control: 'boolean' },
    titleText: { control: 'text' },
    disableBackdropClick: { control: 'boolean' },
  },
  render: (args) => html`
    <ct-modal ?open="${args.open}" ?disableBackdropClick="${args.disableBackdropClick}">
      <span slot="title">${args.titleText}</span>
      <p style="color: var(--text-secondary); margin: 0;">
        Tem certeza que deseja excluir esta transação? Esta ação não pode ser desfeita.
      </p>
      <ct-button slot="footer" variant="outline">Cancelar</ct-button>
      <ct-button slot="footer" variant="primary">Excluir</ct-button>
    </ct-modal>
    <p>Alterne a propriedade 'open' nos controles para ver o Modal.</p>
  `,
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {
    open: true,
    titleText: 'Confirmar Ação',
    disableBackdropClick: false,
  },
};
