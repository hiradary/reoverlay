# Reoverlay

A tiny, typed modal manager for React. Reoverlay gives you one top-level
`ModalContainer` and a small imperative API for opening, stacking, and closing
modals from anywhere in your app.

[![Version](https://img.shields.io/npm/v/reoverlay)](https://www.npmjs.com/package/reoverlay)
[![Downloads](https://img.shields.io/npm/dw/reoverlay)](https://www.npmjs.com/package/reoverlay)
[![License](https://img.shields.io/npm/l/reoverlay)](LICENSE)

## Install

```bash
pnpm add reoverlay
```

```bash
npm install reoverlay
yarn add reoverlay
```

## Quick Start

Mount `ModalContainer` once near the root of your app.

```tsx
import { ModalContainer } from 'reoverlay'

export function App() {
  return (
    <>
      <Routes />
      <ModalContainer />
    </>
  )
}
```

Create a modal. `ModalWrapper` is optional, but it provides the default backdrop,
animations, outside-click close behavior, and Escape close behavior.

```tsx
import { ModalWrapper, Reoverlay } from 'reoverlay'
import 'reoverlay/ModalWrapper.css'

type ConfirmModalProps = {
  message: string
  onConfirm: () => void
}

export function ConfirmModal({ message, onConfirm }: ConfirmModalProps) {
  return (
    <ModalWrapper aria-label="Confirm action">
      <p>{message}</p>
      <button onClick={onConfirm} type="button">
        Confirm
      </button>
      <button onClick={() => Reoverlay.hideModal()} type="button">
        Cancel
      </button>
    </ModalWrapper>
  )
}
```

Open the modal directly.

```tsx
import { Reoverlay } from 'reoverlay'
import { ConfirmModal } from './ConfirmModal'

Reoverlay.showModal(ConfirmModal, {
  message: 'Delete this post?',
  onConfirm: () => {
    Reoverlay.hideModal()
  },
})
```

## Named Modals

You can configure modal names once and open them later by string. This is useful
for app-wide modals, interceptors, and places where importing the modal component
would be awkward.

```tsx
import { ModalContainer, Reoverlay } from 'reoverlay'
import { AuthModal, ConfirmModal } from './modals'

Reoverlay.config([
  { name: 'AuthModal', component: AuthModal },
  { name: 'ConfirmModal', component: ConfirmModal },
])

export function App() {
  return (
    <>
      <Routes />
      <ModalContainer />
    </>
  )
}
```

```tsx
Reoverlay.showModal('ConfirmModal', {
  message: 'Archive this item?',
})
```

## API

### `Reoverlay.config(configData)`

Registers named modals.

```ts
type ModalConfigItem = {
  name: string
  component: React.ElementType | React.ReactElement
}
```

Names must be unique within a single config call.

### `Reoverlay.showModal(modal, props?)`

Shows a modal. `modal` can be a configured string name, a React component, or a
React element. `props` are passed to the modal when it renders.

```tsx
Reoverlay.showModal(MyModal, { title: 'Hello' })
Reoverlay.showModal(<MyModal title="Hello" />)
Reoverlay.showModal('MyModal', { title: 'Hello' })
```

### `Reoverlay.hideModal(modalName?)`

Hides a modal. When no name is provided, the last visible modal is hidden. When a
name is provided, that configured modal is hidden.

```ts
Reoverlay.hideModal()
Reoverlay.hideModal('ConfirmModal')
```

### `Reoverlay.hideAll()`

Closes every active modal.

```ts
Reoverlay.hideAll()
```

## `ModalWrapper`

`ModalWrapper` is a small default shell. You can skip it and render your own
modal UI if you only want Reoverlay's state orchestration.

```tsx
import type { ModalWrapperProps } from 'reoverlay'
```

| Prop                        | Type                                                                                                          | Default                       |
| --------------------------- | ------------------------------------------------------------------------------------------------------------- | ----------------------------- |
| `animation`                 | `'fade' \| 'zoom' \| 'flip' \| 'door' \| 'rotate' \| 'slideUp' \| 'slideDown' \| 'slideLeft' \| 'slideRight'` | `'fade'`                      |
| `wrapperClassName`          | `string`                                                                                                      | `''`                          |
| `contentContainerClassName` | `string`                                                                                                      | `''`                          |
| `onClose`                   | `(event) => void`                                                                                             | `() => Reoverlay.hideModal()` |
| `closeOnEscape`             | `boolean`                                                                                                     | `true`                        |
| `aria-label`                | `string`                                                                                                      | `undefined`                   |
| `aria-labelledby`           | `string`                                                                                                      | `undefined`                   |
| `aria-describedby`          | `string`                                                                                                      | `undefined`                   |
| `role`                      | `'dialog' \| 'alertdialog'`                                                                                   | `'dialog'`                    |

The preferred CSS import is:

```ts
import 'reoverlay/ModalWrapper.css'
```

The legacy import path is still supported:

```ts
import 'reoverlay/lib/ModalWrapper.css'
```

## Development

This repo uses pnpm workspaces.

```bash
pnpm install
pnpm dev
```

Useful scripts:

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build:package
pnpm build:demo
pnpm build:all
```

The demo lives in `demo/` and builds with Vite for GitHub Pages under
`/reoverlay/`.

## Release Checklist

1. Update the version in `package.json`.
2. Run `pnpm install --frozen-lockfile`.
3. Run `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build:all`.
4. Inspect the package contents with `npm pack --dry-run`.
5. Publish with `pnpm publish --otp <code>` if your npm account requires 2FA.
6. Deploy the demo with `pnpm --filter reoverlay-demo deploy`.

## License

[MIT](LICENSE)
