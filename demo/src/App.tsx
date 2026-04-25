import { ModalContainer, ModalWrapper, Reoverlay, type ModalAnimation } from 'reoverlay'
import 'reoverlay/ModalWrapper.css'

import logo from './assets/logo.svg'
import myPhoto from './assets/me.jpeg'
import Icon from './Icon'

const animationTypes: ModalAnimation[] = [
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

const installationCode = `
pnpm add reoverlay
// or if you prefer npm
npm install reoverlay
`

type DemoModalProps = {
  animation: ModalAnimation
}

const Code = ({ code }: { code: string }) => (
  <div className="Code">
    <pre>
      <code>{code.trim()}</code>
    </pre>
  </div>
)

const Modal3 = ({ animation }: DemoModalProps) => {
  return (
    <ModalWrapper animation={animation} contentContainerClassName="modalContent">
      <h3 className="modalContent__title">
        #3 Modal. Ok that's enough 😆 (Though you can keep stacking up as you wish.)
      </h3>
      <div className="modalContent__buttonContainer">
        <button onClick={() => Reoverlay.hideModal()} type="button">
          Hide
        </button>
        <button onClick={() => Reoverlay.hideAll()} type="button">
          Hide all
        </button>
      </div>
    </ModalWrapper>
  )
}

const Modal2 = ({ animation }: DemoModalProps) => {
  return (
    <ModalWrapper animation={animation} contentContainerClassName="modalContent">
      <h3 className="modalContent__title">
        #2 Modal. It's getting dark here 🌗. Wanna see the third one?
      </h3>
      <div className="modalContent__buttonContainer">
        <button onClick={() => Reoverlay.showModal(Modal3, { animation })} type="button">
          Heck yeah! Show #3 Modal
        </button>
        <button onClick={() => Reoverlay.hideModal()} type="button">
          Hide
        </button>
        <button onClick={() => Reoverlay.hideAll()} type="button">
          Hide all
        </button>
      </div>
    </ModalWrapper>
  )
}

const Modal1 = ({ animation }: DemoModalProps) => {
  return (
    <ModalWrapper animation={animation} contentContainerClassName="modalContent">
      <h3 className="modalContent__title">#1 Modal. So sweet! ❤️. Wanna see more?</h3>
      <div className="modalContent__buttonContainer">
        <button onClick={() => Reoverlay.showModal(Modal2, { animation })} type="button">
          Yup! Show #2 Modal
        </button>
        <button onClick={() => Reoverlay.hideModal()} type="button">
          Hide
        </button>
      </div>
    </ModalWrapper>
  )
}

const App = () => {
  const showModal = (animation: ModalAnimation) => {
    Reoverlay.showModal(Modal1, { animation })
  }

  return (
    <main>
      <div className="container">
        <header className="header">
          <img className="header__logo" src={logo} alt="Reoverlay" />
          <h1 className="header__title">Reoverlay</h1>
          <p className="header__description">The missing solution for managing modals in React.</p>
          <div className="header__buttonContainer">
            <a
              className="header__githubButton"
              href="https://github.com/hiradary/reoverlay"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="header__githubButtonText">Visit GitHub</span>
              <Icon name="github" />
            </a>
            <a
              className="header__donationButton"
              href="https://www.buymeacoffee.com/hiradary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="header__donationButtonText">Buy me a coffee</span>
              <Icon name="donation" />
            </a>
          </div>

          <Code code={installationCode} />
        </header>

        <section className="section">
          <h3 className="section__title">Animation types</h3>
          <p className="section__description">
            There are quite a few preset animations. You can create your own custom animation too!
          </p>

          <div className="section__animationTypesContainer">
            {animationTypes.map((type) => (
              <button
                className="section__animationTypeContainer"
                key={type}
                onClick={() => showModal(type)}
                type="button"
              >
                <span className="section__animationType">{type}</span>
              </button>
            ))}
          </div>
        </section>

        <section className="section">
          <h3 className="section__title">Usage, Props, etc.</h3>
          <p className="section__description">
            You can find more information on{' '}
            <a
              href="https://github.com/hiradary/reoverlay"
              target="_blank"
              rel="noopener noreferrer"
              className="section__link"
            >
              github
            </a>
            .
          </p>
        </section>

        <footer className="footer">
          <img src={myPhoto} alt="Hirad Arshadi" className="footer__profilePhoto" />
          <p className="footer__intentionText">
            Made with{' '}
            <span role="img" aria-label="Love">
              ❤️
            </span>{' '}
            for the react community
          </p>
          <a
            href="https://twitter.com/hiradary"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__twitterContainer"
          >
            <Icon name="twitter" className="footer__twitterIcon" />
            <span className="footer__twitterHandle">@hiradary</span>
          </a>
        </footer>
      </div>
      <ModalContainer />
    </main>
  )
}

export default App
