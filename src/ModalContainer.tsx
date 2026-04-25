import { Fragment, cloneElement, isValidElement, useEffect, useState } from 'react'

import { EVENT } from './constants'
import type { ActiveModal } from './types'
import { eventManager } from './utils'

const ModalContainer = () => {
  const [modals, setModals] = useState<ActiveModal[]>([])

  useEffect(() => {
    const unsubscribe = eventManager.on<ActiveModal[]>(EVENT.CHANGE_MODAL, setModals)
    return unsubscribe
  }, [])

  return (
    <div className="reOverlay">
      {modals.map(({ modalKey, component, props }) => {
        if (isValidElement(component)) {
          return <Fragment key={`id-${modalKey}`}>{cloneElement(component, props)}</Fragment>
        }

        const Component = component

        return (
          <Fragment key={`id-${modalKey}`}>
            <Component {...props} />
          </Fragment>
        )
      })}
    </div>
  )
}

export default ModalContainer
