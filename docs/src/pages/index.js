import React from "react"
import { Reoverlay, ModalWrapper, ModalContainer } from "reoverlay"
import "reoverlay/lib/ModalWrapper.css"

import { Icon, SEO, Code } from "../components"
import { ANIMATION_TYPES, INSTALLATION_CODE } from "../constants"
import { ReactComponent as Logo } from "../images/logo.svg"
import myPhoto from "../images/me.jpg"
import "./index.css"

const Modal3 = ({ animation }) => {
  return (
    <ModalWrapper
      animation={animation}
      contentContainerClassName="modalContent"
    >
      <h3 className="modalContent__title">
        #3 Modal. Ok that's enough 😆 (Though you can keep stacking up as you
        wish.)
      </h3>
      <div className="modalContent__buttonContainer">
        <button onClick={() => Reoverlay.hideModal()}>Hide</button>
        <button onClick={() => Reoverlay.hideAll()}>Hide all</button>
      </div>
    </ModalWrapper>
  )
}

const Modal2 = ({ animation }) => {
  return (
    <ModalWrapper
      animation={animation}
      contentContainerClassName="modalContent"
    >
      <h3 className="modalContent__title">
        #2 Modal. It's getting dark here 🌗. Wanna see the third one?
      </h3>
      <div className="modalContent__buttonContainer">
        <button onClick={() => Reoverlay.showModal(Modal3)}>
          Heck yeah! Show #3 Modal
        </button>
        <button onClick={() => Reoverlay.hideModal()}>Hide</button>
        <button onClick={() => Reoverlay.hideAll()}>Hide all</button>
      </div>
    </ModalWrapper>
  )
}

const Modal1 = ({ animation }) => {
  return (
    <ModalWrapper
      animation={animation}
      contentContainerClassName="modalContent"
    >
      <h3 className="modalContent__title">
        #1 Modal. So sweet! ❤️. Wanna see more?
      </h3>
      <div className="modalContent__buttonContainer">
        <button onClick={() => Reoverlay.showModal(Modal2)}>
          Yup! Show #2 Modal
        </button>
        <button onClick={() => Reoverlay.hideModal()}>Hide</button>
      </div>
    </ModalWrapper>
  )
}

const IndexPage = () => {
  const showModal = animation => {
    Reoverlay.showModal(Modal1, { animation })
  }

  return (
    <>
      <SEO title="Reoverlay" />
      <main>
        <div className="container">
          <header className="header">
            <Logo />
            <h1 className="header__title">Reoverlay</h1>
            <p className="header__description">
              The missing solution for managing modals in React.
            </p>
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
                <span className="header__donationButtonText">
                  Buy me a coffee
                </span>
                <Icon name="donation" />
              </a>
            </div>

            <Code code={INSTALLATION_CODE} />
          </header>

          <section className="section">
            <h3 className="section__title">Animation types</h3>
            <p className="section__description">
              There are quite a few preset animations. You can create your own
              custom animation too!
            </p>

            <div className="section__animationTypesContainer">
              {ANIMATION_TYPES.map((type, index) => (
                <div
                  className="section__animationTypeContainer"
                  key={index}
                  onClick={() => showModal(type)}
                >
                  <div className="section__animationType">{type}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h3 className="section__title">Usage, Props, etc.</h3>
            <p className="section__description">
              You can find more information on{" "}
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
            <img
              src={myPhoto}
              alt="Hirad Arshadi"
              className="footer__profilePhoto"
            />
            <p className="footer__intentionText">
              Made with{" "}
              <span role="img" aria-label="Love">
                ❤️
              </span>{" "}
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
    </>
  )
}

export default IndexPage
