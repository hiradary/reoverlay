import type React from 'react'

export type ModalProps = Record<string, unknown>

export type ModalComponent<P = any> = React.ElementType<P>

export type ModalElement<P = any> = React.ReactElement<P>

export type ModalRenderable<P = any> = ModalComponent<P> | ModalElement<P>

export type ModalConfigItem<P = any> = {
  name: string
  component: ModalRenderable<P>
}

export type ModalAnimation =
  | 'fade'
  | 'zoom'
  | 'flip'
  | 'door'
  | 'rotate'
  | 'slideUp'
  | 'slideDown'
  | 'slideLeft'
  | 'slideRight'

export type ModalCloseEvent =
  | React.MouseEvent<HTMLDivElement>
  | KeyboardEvent
  | React.KeyboardEvent<HTMLDivElement>

export type ModalWrapperProps = {
  'aria-describedby'?: string
  'aria-label'?: string
  'aria-labelledby'?: string
  animation?: ModalAnimation
  children?: React.ReactNode
  closeOnEscape?: boolean
  contentContainerClassName?: string
  onClose?: (event: ModalCloseEvent) => void
  role?: 'dialog' | 'alertdialog'
  wrapperClassName?: string
}

export type ActiveModal<P = ModalProps> = {
  component: ModalRenderable<P>
  modalKey: string
  props: P
}
