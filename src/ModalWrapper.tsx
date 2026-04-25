import { useEffect, useRef } from 'react'
import type React from 'react'

import Reoverlay from './Reoverlay'
import type { ModalWrapperProps } from './types'

const ModalWrapper = ({
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  animation = 'fade',
  children = null,
  closeOnEscape = true,
  contentContainerClassName = '',
  onClose = () => {
    Reoverlay.hideModal()
  },
  role = 'dialog',
  wrapperClassName = '',
}: ModalWrapperProps) => {
  const wrapperElement = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!closeOnEscape) return undefined

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(event)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeOnEscape, onClose])

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === wrapperElement.current) {
      onClose(event)
    }
  }

  return (
    <div
      aria-describedby={ariaDescribedBy}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      aria-modal="true"
      className={`reOverlay__modalWrapper -ro-${animation} ${wrapperClassName}`.trim()}
      onClick={handleClickOutside}
      ref={wrapperElement}
      role={role}
    >
      <div className={`reOverlay__modalContainer ${contentContainerClassName}`.trim()}>
        {children}
      </div>
    </div>
  )
}

export default ModalWrapper
