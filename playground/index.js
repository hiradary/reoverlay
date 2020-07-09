import React from 'react'
import ReactDOM from 'react-dom'

import { ModalWrapper, Reoverlay, ModalContainer } from '../src'

import '../src/ModalWrapper.css'
import './index.css'

const ANIMATION_TYPES = [
  'fade',
  'zoom',
  'flip',
  'door',
  'rotate',
  'slideUp',
  'slideDown',
  'slideLeft',
  'slideRight',
]

const MyModal3 = ({ title, animationType }) => {
  return (
    <ModalWrapper
      contentContainerClassName="playground__modalContentContainer"
      onClose={() => Reoverlay.hideModal()}
      animation={animationType}
    >
      <h1>{title}</h1>
      <button onClick={() => Reoverlay.hideAll()}>Hide all</button>
      <button onClick={() => Reoverlay.hideModal()}>Hide this</button>
      <button onClick={() => Reoverlay.hideModal('MyModal2')}>Hide second modal</button>
    </ModalWrapper>
  )
}

const MyModal2 = ({ animationType, title }) => {
  const openThirdModal = () => {
    Reoverlay.showModal('MyModal3', {
      animationType,
      title: 'Third modal!!',
    })
  }
  return (
    <ModalWrapper
      contentContainerClassName="playground__modalContentContainer"
      onClose={() => Reoverlay.hideModal()}
      animation={animationType}
    >
      <h1>{title}</h1>
      <button onClick={openThirdModal}>Open third modal</button>
      <button onClick={() => Reoverlay.hideAll()}>Hide all</button>
      <button onClick={() => Reoverlay.hideModal()}>Hide this</button>
    </ModalWrapper>
  )
}

const MyModal = ({ animationType, title }) => {
  const openSecondModal = () => {
    Reoverlay.showModal('MyModal2', {
      animationType,
      title: 'Second modal!',
    })
  }
  return (
    <ModalWrapper
      animation={animationType}
      contentContainerClassName="playground__modalContentContainer"
      onClose={() => Reoverlay.hideModal()}
    >
      <h1>{title}</h1>
      <button onClick={() => Reoverlay.hideModal()}>Hide this</button>
      <button onClick={openSecondModal}>Open second modal</button>
    </ModalWrapper>
  )
}

Reoverlay.config([
  {
    name: 'MyModal',
    component: MyModal,
  },
  {
    name: 'MyModal2',
    component: MyModal2,
  },
  {
    name: 'MyModal3',
    component: MyModal3,
  },
])

const App = () => {
  const showModal = (animationType) => {
    Reoverlay.showModal('MyModal', {
      animationType,
      title: `This is ${animationType} animation.`,
    })
  }

  return (
    <main className="playground">
      <div className="playground__container">
        {ANIMATION_TYPES.map((animationType) => (
          <div
            key={animationType}
            className="playground__animation"
            onClick={() => {
              showModal(animationType)
            }}
          >
            <span className="playground__animationText">{animationType}</span>
          </div>
        ))}
      </div>
      <ModalContainer />
    </main>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
