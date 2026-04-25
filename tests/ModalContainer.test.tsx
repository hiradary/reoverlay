import { act, cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { EVENT } from '../src/constants'
import { ModalContainer, Reoverlay } from '../src'
import { eventManager } from '../src/utils'

const TestModal = ({ label }: { label: string }) => <div>{label}</div>

afterEach(() => {
  act(() => {
    Reoverlay.hideAll()
  })
  cleanup()
})

describe('ModalContainer', () => {
  it('subscribes once and cleans up the exact change listener', () => {
    const { unmount } = render(<ModalContainer />)

    expect(eventManager.listenerCount(EVENT.CHANGE_MODAL)).toBe(1)

    act(() => {
      Reoverlay.showModal(TestModal, { label: 'Stable listener' })
    })

    expect(screen.getByText('Stable listener')).toBeInTheDocument()
    expect(eventManager.listenerCount(EVENT.CHANGE_MODAL)).toBe(1)

    unmount()

    expect(eventManager.listenerCount(EVENT.CHANGE_MODAL)).toBe(0)
  })
})
