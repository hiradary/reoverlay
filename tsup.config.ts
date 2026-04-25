import { copyFile, mkdir } from 'node:fs/promises'

import { defineConfig } from 'tsup'

const copyStyles = async () => {
  await mkdir('dist', { recursive: true })
  await mkdir('lib', { recursive: true })
  await copyFile('src/ModalWrapper.css', 'dist/ModalWrapper.css')
  await copyFile('src/ModalWrapper.css', 'lib/ModalWrapper.css')
}

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  external: ['react', 'react-dom'],
  format: ['esm', 'cjs'],
  minify: true,
  onSuccess: copyStyles,
  outDir: 'dist',
  outExtension({ format }) {
    return {
      js: format === 'cjs' ? '.cjs' : '.js',
    }
  },
  sourcemap: true,
  splitting: false,
  target: 'es2020',
  treeshake: true,
})
