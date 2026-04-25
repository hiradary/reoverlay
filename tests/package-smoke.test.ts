import { createRequire } from 'node:module'
import { execFileSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import { beforeAll, describe, expect, it } from 'vitest'

const require = createRequire(import.meta.url)
const root = path.resolve(import.meta.dirname, '..')

describe('package output', () => {
  beforeAll(() => {
    execFileSync('pnpm', ['build:package'], {
      cwd: root,
      stdio: 'inherit',
    })
  }, 60_000)

  it('emits ESM, CommonJS, declarations, and CSS compatibility files', async () => {
    expect(existsSync(path.join(root, 'dist/index.js'))).toBe(true)
    expect(existsSync(path.join(root, 'dist/index.cjs'))).toBe(true)
    expect(existsSync(path.join(root, 'dist/index.d.ts'))).toBe(true)
    expect(existsSync(path.join(root, 'dist/ModalWrapper.css'))).toBe(true)
    expect(existsSync(path.join(root, 'lib/ModalWrapper.css'))).toBe(true)

    const esm = await import(pathToFileURL(path.join(root, 'dist/index.js')).href)
    const cjs = require('../dist/index.cjs')

    expect(esm.Reoverlay.showModal).toEqual(expect.any(Function))
    expect(cjs.ModalContainer).toEqual(expect.any(Function))
  })
})
