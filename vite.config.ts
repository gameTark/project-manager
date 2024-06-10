/// <reference types="vitest" />
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default {
  plugins: [
    nodePolyfills(),
    electron({
      main: {
        entry: 'src/app/main.ts',
      },
      preload: {
        input: 'src/app/preload.ts',
      },
      // Optional: Use Node.js API in the Renderer process
      renderer: {
      },
    }),
    tsconfigPaths(),
    react(),
  ],
  // resolve: {
  //   alias: {
  //     path: 'path-browserify'
  //   }
  // },
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  },
}
