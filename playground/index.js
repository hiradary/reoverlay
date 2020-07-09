/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from 'react'
import ReactDOM from 'react-dom'

import { ModalWrapper, Reoverlay, OverlayContainer } from '../src'

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

const MyModal = ({ animationType, title }) => {
  return (
    <ModalWrapper
      animation={animationType}
      contentContainerClassName="playground__modalContentContainer"
    >
      <h1>{title}</h1>
    </ModalWrapper>
  )
}

Reoverlay.config([
  {
    name: 'MyModal',
    component: MyModal,
  },
])

const App = () => {
  const showModal = (animationType) => {
    Reoverlay.showOverlay('MyModal', {
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
      <OverlayContainer />
    </main>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
