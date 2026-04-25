import { cleanup, render, screen, act } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { ModalContainer, Reoverlay } from '../src'

const TestModal = ({ label }: { label: string }) => <div>{label}</div>

afterEach(() => {
  act(() => {
    Reoverlay.hideAll()
  })
  cleanup()
  vi.restoreAllMocks()
})

describe('Reoverlay', () => {
  it('renders a direct modal component with props', () => {
    render(<ModalContainer />)

    act(() => {
      Reoverlay.showModal(TestModal, { label: 'Direct modal' })
    })

    expect(screen.getByText('Direct modal')).toBeInTheDocument()
  })

  it('renders a configured modal by name', () => {
    render(<ModalContainer />)
    Reoverlay.config([{ component: TestModal, name: 'NamedModal' }])

    act(() => {
      Reoverlay.showModal('NamedModal', { label: 'Named modal' })
    })

    expect(screen.getByText('Named modal')).toBeInTheDocument()
  })

  it('supports React elements passed directly', () => {
    render(<ModalContainer />)

    act(() => {
      Reoverlay.showModal(<TestModal label="Element modal" />)
    })

    expect(screen.getByText('Element modal')).toBeInTheDocument()
  })

  it('hides the last modal by default', () => {
    render(<ModalContainer />)

    act(() => {
      Reoverlay.showModal(TestModal, { label: 'First modal' })
      Reoverlay.showModal(TestModal, { label: 'Second modal' })
      Reoverlay.hideModal()
    })

    expect(screen.getByText('First modal')).toBeInTheDocument()
    expect(screen.queryByText('Second modal')).not.toBeInTheDocument()
  })

  it('hides a named modal while leaving other modals open', () => {
    render(<ModalContainer />)
    Reoverlay.config([
      { component: TestModal, name: 'FirstNamedModal' },
      { component: TestModal, name: 'SecondNamedModal' },
    ])

    act(() => {
      Reoverlay.showModal('FirstNamedModal', { label: 'First named modal' })
      Reoverlay.showModal('SecondNamedModal', { label: 'Second named modal' })
      Reoverlay.hideModal('SecondNamedModal')
    })

    expect(screen.getByText('First named modal')).toBeInTheDocument()
    expect(screen.queryByText('Second named modal')).not.toBeInTheDocument()
  })

  it('hides all active modals', () => {
    render(<ModalContainer />)

    act(() => {
      Reoverlay.showModal(TestModal, { label: 'First modal' })
      Reoverlay.showModal(TestModal, { label: 'Second modal' })
      Reoverlay.hideAll()
    })

    expect(screen.queryByText('First modal')).not.toBeInTheDocument()
    expect(screen.queryByText('Second modal')).not.toBeInTheDocument()
  })

  it('validates duplicate configured names', () => {
    expect(() => {
      Reoverlay.config([
        { component: TestModal, name: 'DuplicateModal' },
        { component: TestModal, name: 'DuplicateModal' },
      ])
    }).toThrow(/unique/i)
  })

  it('throws for missing configured modals', () => {
    expect(() => {
      Reoverlay.showModal('MissingModal')
    }).toThrow(/not found/i)
  })
})
