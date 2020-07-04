/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

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
      className={classNames(
        'reOverlay__modalWrapper',
        {
          [`-ro-${animation}`]: animation,
        },
        wrapperClassName
      )}
      onClick={handleClickOutside}
    >
      <div className={classNames('reOverlay__modalContainer', contentContainerClassName)}>
        {children}
      </div>
    </div>
  )
}

ModalWrapper.propTypes = {
  children: PropTypes.node,
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
  animation: '',
  onClose: () => {},
}

export default ModalWrapper
