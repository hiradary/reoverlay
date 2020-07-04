import React, { useEffect, useState, Fragment } from 'react'
import PropTypes from 'prop-types'

import Reoverlay from './Reoverlay'
import { eventManager } from './utils'
import { EVENT } from './constants'

const OverlayContainer = ({ overlays }) => {
  const [overlayArray, setOverlayArray] = useState([])

  useEffect(() => {
    Reoverlay.config(overlays)
  }, [])

  useEffect(() => {
    eventManager.on(EVENT.CHANGE_OVERLAY, (derivedOverlays) => {
      setOverlayArray(derivedOverlays)
    })

    return () => {
      eventManager.off()
    }
  }, [overlayArray])

  return (
    <div className="reOverlay">
      {overlayArray.map(({ overlayKey, component, props }) => {
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

OverlayContainer.propTypes = {
  overlays: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      component: PropTypes.elementType.isRequired,
    })
  ),
}

OverlayContainer.defaultProps = {
  overlays: [],
}

export default OverlayContainer
