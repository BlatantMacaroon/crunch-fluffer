import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    // This helps Vitest handle the .js extensions in your imports 
    // when the actual files are .ts
    alias: {
      '@shared/': new URL('../shared/', import.meta.url).pathname,
    },
  },
});