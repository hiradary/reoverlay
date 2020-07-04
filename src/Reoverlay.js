import shortid from 'shortid'

import { VALIDATE, EVENT } from './constants'
import { validate, eventManager, getLastElement } from './utils'

const Reoverlay = {
  overlays: new Map(),
  snappshots: new Map(),

  config(configData) {
    validate(VALIDATE.CONFIG, configData)

    // Set config data
    configData.forEach((item) => {
      this.overlays.set(item.name, item.component)
    })
  },

  showOverlay(overlay, props = {}) {
    const overlayType = validate(VALIDATE.SHOW_OVERLAY, overlay)

    if (overlayType === 'string') {
      // "overlay" is a string here
      const overlayKey = overlay

      const hasAlreadyDefinedOverlay = this.overlays.has(overlayKey)

      if (!hasAlreadyDefinedOverlay) {
        throw new Error(
          "Reoverlay: Overlay not found. You're probably trying to access a pre-configured overlay which does not exist."
        )
      }

      const overlayElement = this.overlays.get(overlayKey)
      this.applyOverlay({
        component: overlayElement,
        props,
        overlayKey,
        type: EVENT.SHOW_OVERLAY,
      })
    } else {
      const data = {
        component: overlay,
        props,
        overlayKey: shortid.generate(),
        type: EVENT.SHOW_OVERLAY,
      }
      this.applyOverlay(data)
    }
  },

  getSnappshotsArray() {
    const snappshotsArray = []
    for (const [key, value] of this.snappshots.entries()) {
      snappshotsArray.push({ overlayKey: key, ...value })
    }

    return snappshotsArray
  },

  // If "overlay" is not specified, the last one will be hidden by default.
  hideOverlay(overlay = null) {
    if (overlay) {
      validate(VALIDATE.HIDE_OVERLAY)

      const overlayKey = overlay
      const hasAlreadyDefinedSnappshot = this.snappshots.has(overlayKey)

      if (!hasAlreadyDefinedSnappshot) {
        throw new Error(
          "Reoverlay: Snappshot not found. You're probably trying to hide an overlay which does not exist."
        )
      } else {
        const snappshot = this.snappshots.get(overlayKey)
        this.applyOverlay({
          ...snappshot,
          overlayKey,
          type: EVENT.HIDE_OVERLAY,
        })
      }
    } else {
      const snappshotsArray = this.getSnappshotsArray()
      const lastSnappshot = getLastElement(snappshotsArray) || null

      if (lastSnappshot) {
        this.applyOverlay({ ...lastSnappshot, type: EVENT.HIDE_OVERLAY })
      } else {
        console.error("Reoverlay: There's no active overlay to be hidden")
      }
    }
  },

  hideAllOverlays() {
    this.applyOverlay({ type: EVENT.HIDE_ALL_OVERLAYS })
  },

  applyOverlay({ component, props, overlayKey, type }) {
    switch (type) {
      case EVENT.SHOW_OVERLAY:
        this.snappshots.set(overlayKey, { component, props })
        break
      case EVENT.HIDE_ALL_OVERLAYS:
        this.snappshots.clear()
        break
      default:
        this.snappshots.delete(overlayKey)
        break
    }

    const snappshotsArray = this.getSnappshotsArray()
    eventManager.emit(EVENT.CHANGE_OVERLAY, snappshotsArray)
  },
}

export default Reoverlay
