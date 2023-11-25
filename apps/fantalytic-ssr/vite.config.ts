/// <reference types="vitest" />

import analog from '@analogjs/platform';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, Plugin, splitVendorChunkPlugin } from 'vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    publicDir: 'src/public',

    optimizeDeps: {
      include: ['@angular/common', '@angular/forms'],
    },
    build: {
      target: ['es2020'],
    },
    plugins: [
      analog({
        ssrBuildDir: '../../dist/apps/fantalytic-ssr/ssr',
        entryServer: 'apps/fantalytic-ssr/src/main.server.ts',
        vite: {
          inlineStylesExtension: 'css',
          tsconfig:
            mode === 'test'
              ? 'apps/fantalytic-ssr/tsconfig.spec.json'
              : 'apps/fantalytic-ssr/tsconfig.app.json',
        },
        nitro: {
          rootDir: 'apps/fantalytic-ssr',
          output: {
            dir: '../../../dist/apps/fantalytic-ssr/analog',
            publicDir: '../../../dist/apps/fantalytic-ssr/analog/public',
          },
          publicAssets: [{ dir: `../../../dist/apps/fantalytic-ssr/client` }],
          serverAssets: [
            { baseName: 'public', dir: `./dist/apps/fantalytic-ssr/client` },
          ],
          buildDir: '../../dist/apps/fantalytic-ssr/.nitro',
        },
        prerender: {
          routes: ['/'],
        },
      }),
      nxViteTsPaths(),
      visualizer() as Plugin,
      splitVendorChunkPlugin(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      cache: {
        dir: `../../node_modules/.vitest`,
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
