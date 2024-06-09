/// <reference types="vitest" />
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

export default {
  plugins: [
    tsconfigPaths(),
    react(),
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
  ],
  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}']
  },
}
