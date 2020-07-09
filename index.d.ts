import React from 'react'

export interface ModalWrapperProps {
  children: React.ReactNode
  wrapperClassName?: string
  contentContainerClassName?: string
  onClose?: (event: React.MouseEvent<HTMLElement>) => void
  animation?:
    | 'fade'
    | 'zoom'
    | 'flip'
    | 'door'
    | 'rotate'
    | 'slideUp'
    | 'slideDown'
    | 'slideLeft'
    | 'slideRight'
}
