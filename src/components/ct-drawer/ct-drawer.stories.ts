import { html } from 'lit';
import type { Meta, StoryObj } from '@storybook/web-components';
import './ct-drawer';

const meta: Meta = {
  title: 'Components/CtDrawer',
  component: 'ct-drawer',
  argTypes: {
    open: { control: 'boolean' },
    position: { control: 'radio', options: ['left', 'right'] },
  },
  render: (args) => html`
    <ct-drawer ?open="${args.open}" position="${args.position}">
      <div style="padding: 20px;">
        <h2>Menu de Opções</h2>
        <p>Conteúdo do drawer aqui.</p>
      </div>
    </ct-drawer>
    <p>Alterne a propriedade 'open' nos controles para ver o Drawer.</p>
  `,
};

export default meta;
type Story = StoryObj;

export const Right: Story = {
  args: {
    open: true,
    position: 'right',
  },
};

export const Left: Story = {
  args: {
    open: true,
    position: 'left',
  },
};
