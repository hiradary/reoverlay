import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ModalWrapper } from '../src'

describe('ModalWrapper', () => {
  it('adds dialog semantics and custom classes', () => {
    render(
      <ModalWrapper
        aria-label="Confirm action"
        animation="slideUp"
        contentContainerClassName="custom-content"
        wrapperClassName="custom-wrapper"
      >
        Content
      </ModalWrapper>
    )

    const dialog = screen.getByRole('dialog', { name: 'Confirm action' })

    expect(dialog).toHaveAttribute('aria-modal', 'true')
    expect(dialog).toHaveClass('-ro-slideUp')
    expect(dialog).toHaveClass('custom-wrapper')
    expect(dialog.firstElementChild).toHaveClass('custom-content')
  })

  it('calls onClose when the wrapper backdrop is clicked', () => {
    const onClose = vi.fn()
    render(
      <ModalWrapper aria-label="Close from backdrop" onClose={onClose}>
        <button type="button">Inside</button>
      </ModalWrapper>
    )

    fireEvent.click(screen.getByRole('dialog', { name: 'Close from backdrop' }))
    fireEvent.click(screen.getByRole('button', { name: 'Inside' }))

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('calls onClose when Escape is pressed', () => {
    const onClose = vi.fn()
    render(
      <ModalWrapper aria-label="Close from keyboard" onClose={onClose}>
        Content
      </ModalWrapper>
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('can disable Escape close behavior', () => {
    const onClose = vi.fn()
    render(
      <ModalWrapper aria-label="Escape disabled" closeOnEscape={false} onClose={onClose}>
        Content
      </ModalWrapper>
    )

    fireEvent.keyDown(document, { key: 'Escape' })

    expect(onClose).not.toHaveBeenCalled()
  })
})
