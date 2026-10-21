import { resolve } from 'path';

import { defineConfig } from 'vite';
import { compileClient } from 'pug';

function pugPlugin() {
  return {
    name: 'pug',
    transform(src: string, id: string) {
      if (id.endsWith('.pug')) {
        return {
          code: `${compileClient(src, { filename: id })}\nexport default template`,
          map: null,
        };
      }
    },
  };
}

export default defineConfig({
  plugins: [pugPlugin()],
  publicDir: 'static',
  build: {
    sourcemap: true,
    lib: {
      entry: resolve(__dirname, 'main.js'),
      name: 'GirderPluginMds',
      fileName: 'girder-plugin-mds',
    },
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css';
          }
          return '[name][extname]';
        },
      },
    },
  },
});
