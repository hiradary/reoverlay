import path from 'node:path'
import { fileURLToPath } from 'node:url'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

export default defineConfig({
  base: '/reoverlay/',
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^reoverlay\/ModalWrapper.css$/,
        replacement: path.resolve(root, 'src/ModalWrapper.css'),
      },
      {
        find: 'reoverlay',
        replacement: path.resolve(root, 'src/index.ts'),
      },
    ],
  },
})
