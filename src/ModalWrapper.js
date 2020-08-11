import React, { useRef } from 'react'
import PropTypes from 'prop-types'

import Reoverlay from './Reoverlay'

const ModalWrapper = ({
  children,
  wrapperClassName,
  contentContainerClassName,
  animation,
  onClose,
}) => {
  const wrapperElement = useRef(null)

  const handleClose = (event) => {
    onClose(event)
  }

  const handleClickOutside = (event) => {
    if (event.target === wrapperElement.current) {
      handleClose(event)
    }
  }

  return (
    <div
      ref={wrapperElement}
      role="dialog"
      className={`reOverlay__modalWrapper -ro-${animation} ${wrapperClassName}`}
      onClick={handleClickOutside}
    >
      <div className={`reOverlay__modalContainer ${contentContainerClassName}`}>{children}</div>
    </div>
  )
}

ModalWrapper.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  wrapperClassName: PropTypes.string,
  contentContainerClassName: PropTypes.string,
  animation: PropTypes.oneOf([
    'fade',
    'zoom',
    'flip',
    'door',
    'rotate',
    'slideUp',
    'slideDown',
    'slideLeft',
    'slideRight',
  ]),
  onClose: PropTypes.func,
}

ModalWrapper.defaultProps = {
  children: null,
  wrapperClassName: '',
  contentContainerClassName: '',
  animation: 'fade',
  onClose: () => Reoverlay.hideModal(),
}

export default ModalWrapper
