import React, { useEffect, useState, Fragment } from 'react'

import { eventManager } from './utils'
import { EVENT } from './constants'

const OverlayContainer = () => {
  const [overlays, setOverlays] = useState([])

  useEffect(() => {
    eventManager.on(EVENT.CHANGE_OVERLAY, (derivedOverlays) => {
      setOverlays(derivedOverlays)
    })

    return () => {
      eventManager.off()
    }
  }, [overlays])

  return (
    <div className="reOverlay">
      {overlays.map(({ overlayKey, component, props }) => {
        const Component = component
        return (
          <Fragment key={`id-${overlayKey}`}>
            <Component {...props} />
          </Fragment>
        )
      })}
    </div>
  )
}

export default OverlayContainer
