import React, { useEffect, useState, Fragment } from 'react'

import { eventManager } from './utils'
import { EVENT } from './constants'

const ModalContainer = () => {
  const [modals, setModals] = useState([])

  useEffect(() => {
    eventManager.on(EVENT.CHANGE_MODAL, (derivedModals) => {
      setModals(derivedModals)
    })

    return () => {
      eventManager.off()
    }
  }, [modals])

  return (
    <div className="reOverlay">
      {modals.map(({ modalKey, component, props }) => {
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
