# Reoverlay

![Size](https://img.shields.io/bundlephobia/minzip/reoverlay)
![Downloads](https://img.shields.io/npm/dm/reoverlay)
![Version](https://img.shields.io/npm/v/reoverlay)
![Twitter](https://img.shields.io/twitter/follow/hiradary?style=social)
![NPM License](https://img.shields.io/npm/l/reoverlay)
<p>The missing solution for managing modals in React.</p>

![Reoverlay](http://s12.picofile.com/file/8402126226/reoverlay_github_cover.jpg)

## Installation 🔥
```bash
npm install reoverlay --save

# or if you prefer Yarn:
yarn add reoverlay
```
## Props ⚒

### Reoverlay methods

##### `config(configData)`

| Name       | Type                                           | Default | Descripiton                         |
|------------|------------------------------------------------|---------|-------------------------------------|
| configData | `Array<{ name: string, component: React.FC }>` | `[]`    | An array of modals with their name. |

This method must be called in the entry part of your application (e.g `App.js`), or basically before you attemp to show any modal. It takes an array of objects, containing data about your modals.

```javascript
import { AuthModal, DeleteModal, PostModal } from '../modals';

Reoverlay.config([
  {
    name: 'AuthModal',
    component: AuthModal
  },
  {
    name: 'DeleteModal',
    component: DeleteModal
  },
  {
    name: 'PostModal',
    component: PostModal
  }
])
```
<strong>NOTE:</strong> If you're code-splitting your app and you don't want to import all modals in the entry part, you don't need to use this. Please refer [usage](#usage-) for more info.

##### `showOverlay(overlay, props)`

| Name    | Type                  | Default | Descripiton                                                                                                 |
|---------|-----------------------|---------|-------------------------------------------------------------------------------------------------------------|
| overlay | `string` \| `React.FC`| `null`  | Either your modal's name (in case you've already passed that to Reoverlay.config()) or your modal component.|
| props   | `object`              | `{}`    | Optional. The props you want to be passed on the modal.                                                     |

```javascript
import { Reoverlay } from 'reoverlay';
import { DeleteModal } from '../modals';

const MyPage = () => {
  const showModal = () => {
    Reoverlay.showOverlay(DeleteModal);
    // or Reoverlay.showOverlay("DeleteModal")
  }

  return (
    <div>
      <button onClick={showModal}>Show modal</button>
    </div>
  )
}
```

##### `hideOverlay(overlayName)`

| Name        |  Type    |  Default  | Descripiton                                                                           |
|-------------|----------|-----------|---------------------------------------------------------------------------------------|
| overlayName | `string` | `null`    | Optional. Specifies which modal gets hidden. It hides the last open modal by default. |

```javascript
import { Reoverlay, ModalWrapper } from 'reoverlay';

const MyModal = () => {
  const closeModal = () => {
    Reoverlay.hideOverlay();
  }

  <ModalWrapper>
    <h1>My modal content...</h1>
    <button onClick={closeModal}>Close modal</button>
  </ModalWrapper>
}

const MyPage = () => {
  const showModal = () => {
    Reoverlay.showOverlay(MyModal);
  }

  return (
    <div>
      <button onClick={showModal}>Show modal</button>
    </div>
  )
}
```

##### `hideAllOverlays()`
This comes in handy when dealing with multiple modals on top of each other (aka "Stacked Modals"). With this, you can hide all modals at once.

### `ModalWrapper` props

| Name                      | Type                                                                                                        | Default                       | Descripiton                                              |
|---------------------------|-------------------------------------------------------------------------------------------------------------|-------------------------------|----------------------------------------------------------|
| wrapperClassName          | `string`                                                                                                      | `''`                            | Additional CSS class for modal wrapper element.           |
| contentContainerClassName | `string`                                                                                                      | `''`                            | Additional CSS class for modal content container element. |
| animation                 | `'fade'` \| `'zoom'` \| `'flip'` \| `'door'` \| `'rotate'` \| `'slideUp'` \| `'slideDown'` \| `'slideLeft'` \| `'slideRight'` | `'fade'`                        | A preset of various animations for your modal.           |
| onClose                   | `function`                                                                                                    | `() => Reoverlay.hideOverlay()` | Gets called when user clicks outside modal content.      |

## Usage 🎯

There are two ways you can use Reoverlay.

### 1) Pass on your modals directly

`App.js`:
```javascript
import React from 'react';
import { OverlayContainer } from 'reoverlay';

const App = () => {
  return (
    <>
      ...
      <Routes />
      ...
      <OverlayContainer />
    </>
  )
}
```
Later where you want to show your modal:
```javascript
import React from 'react';
import { Reoverlay } from 'reoverlay';

import { ConfirmModal } from '../modals';

const PostPage = () => {
  
  const deletePost = () => {
    Reoverlay.showOverlay(ConfirmModal, {
      confirmText: "Are you sure you want to delete this post",
      onConfirm: () => {
        axios.delete(...)
      }
    })
  }

  return (
    <div>
      <p>This is your post page</p>
      <button onClick={deletePost}>Delete this post</button>
    </div>
  )
}
```
Your modal file: (`ConfirmModal` in this case):
```javascript
import React from 'react';
import { ModalWrapper, Reoverlay } from 'reoverlay';

import 'reoverlay/lib/ModalWrapper.css';

const ConfirmModal = ({ confirmText, onConfirm }) => {

  const closeModal = () => {
    Reoverlay.hideOverlay();
  }

  return (
    <ModalWrapper>
      {confirmText}
      <button onClick={onConfirm}>Yes</button>
      <button onClick={closeModal}>No</button>
    </ModalWrapper>
  )
}
```
### 2) Pass on your modal's name

`App.js`:
```javascript
import React from 'react';
import { Reoverlay, OverlayContainer } from 'reoverlay';

import { AuthModal, DeleteModal, ConfirmModal } from '../modals';

// Here you pass your modals to Reoverlay
Reoverlay.config([
  {
    name: "AuthModal",
    component: AuthModal
  },
  {
    name: "DeleteModal",
    component: DeleteModal
  },
  {
    name: "ConfirmModal",
    component: ConfirmModal
  }
])

const App = () => {
  return (
    <>
      ...
      <Routes />
      ...
      <OverlayContainer />
    </>
  )
}
```

Later where you want to show your modal:
```javascript
import React from 'react';
import { Reoverlay } from 'reoverlay';

const PostPage = () => {
  
  const deletePost = () => {
    Reoverlay.showOverlay("MyConfirmModal", {
      confirmText: "Are you sure you want to delete this post",
      onConfirm: () => {
        axios.delete(...)
      }
    })
  }

  return (
    <div>
      <p>This is your post page</p>
      <button onClick={deletePost}>Delete this post</button>
    </div>
  )
}
```
Your modal file: (`ConfirmModal` in this case):
```javascript
import React from 'react';
import { ModalWrapper, Reoverlay } from 'reoverlay';

import 'reoverlay/lib/ModalWrapper.css';

const ConfirmModal = ({ confirmText, onConfirm }) => {

  const closeModal = () => {
    Reoverlay.hideOverlay();
  }

  return (
    <ModalWrapper>
      {confirmText}
      <button onClick={onConfirm}>Yes</button>
      <button onClick={closeModal}>No</button>
    </ModalWrapper>
  )
}
```
<strong>NOTE:</strong> Using ModalWrapper is totally optional. It's just a half-transparent full-screen div, with some pre-configured animations. You can use your own ModalWrapper. In that case you can fully customize animation, responsiveness, etc. Check the code for [ModalWrapper](https://github.com/hiradary/reoverlay/blob/master/src/ModalWrapper.js).

## Philosophy 🔖
There are many ways you can manage your modals in React. You can ([See a relevant article](https://codeburst.io/modals-in-react-f6c3ff9f4701)):
- Use a modal component as a wrapper (like a button component) and include it wherever you trigger the hide/show of that modal.
- The ‘portal’ approach that takes a modal and attaches it to document.body.
- A top level modal component that shows different contents based on some property in the store.
<p>Each one of them has their own cons & pros. Reoverlay, however, is rather a combination of these three methods. Take a look at the following example:</p>

```javascript
import React, { useState } from 'react';
import Modal from 'somelibrary';

const HomePage = () => {
  const [isDeleteModalOpen, setDeleteModal] = useState(false)
  const [isConfirmModalOpen, setConfirmModal] = useState(false)
  
  return (
    <div>
      <Modal isOpen={isDeleteModalOpen}>
        ...
      </Modal>
      <Modal isOpen={isConfirmModalOpen}>
        ...
      </Modal>
      ...
      <button onClick={() => setDeleteModal(true)}>Show delete modal</button>
      <button onClick={() => setConfirmModal(true)}>Show confirm modal</button>
    </div>
  )
}
```
This is the most commonly adopted aproach. However, I believe it has a few drawbacks:
- You might find it difficult to show modals on top of each other. (aka "Stacked Modals")
- More boilerplate code. If you were to have 3 modals in a page, you had to use Modal component three times, declare more and more variables to handle visiblity, etc.
- Unlike reoverlay, you can't manage your modals outside React scope (e.g Store). Though it's not generally a good practice to manage modals/overlays outside React scope, It comes in handy in some cases. (e.g Using axios interceptors to show modals for network status, access control, etc.)


## LICENSE
[MIT](LICENSE)
