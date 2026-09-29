import { defineWorkspace } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

export default defineWorkspace([
  'vitest.config.ts',
  {
    extends: 'vitest.config.ts',
    plugins: [
      storybookTest({
        configDir: '.storybook',
      }),
    ],
    test: {
      name: 'storybook',
      browser: {
        enabled: true,
        headless: true,
        name: 'chromium',
        provider: 'playwright',
      },
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);
