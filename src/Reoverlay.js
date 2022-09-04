import { nanoid } from 'nanoid/non-secure'

import { VALIDATE, EVENT } from './constants'
import { validate, eventManager, getLastElement } from './utils'

const Reoverlay = {
  modals: new Map(),
  snappshots: new Map(),

  config(configData = []) {
    validate(VALIDATE.CONFIG, configData)

    configData.forEach((item) => {
      this.modals.set(item.name, item.component)
    })
  },

  showModal(modal = null, props = {}) {
    const modalType = validate(VALIDATE.SHOW_MODAL, modal) //"string" | "component"

    if (modalType === 'string') {
      const modalKey = modal
      const doesModalNameMatches = this.modals.has(modalKey)

      if (!doesModalNameMatches) {
        throw new Error(
          `Reoverlay: Modal not found. You're probably trying to access a pre-configured modal which does not exist. Make sure you already 
          passed "${modalKey}" to Reoverlay.config().`
        )
      }

      const modalElement = this.modals.get(modalKey)
      this.applyModal({
        component: modalElement,
        props,
        modalKey,
        type: EVENT.SHOW_MODAL,
      })
    } else {
      this.applyModal({
        component: modal,
        props,
        modalKey: nanoid(),
        type: EVENT.SHOW_MODAL,
      })
    }
  },

  getSnappshotsArray() {
    const snappshotsArray = []
    for (const [key, value] of this.snappshots.entries()) {
      snappshotsArray.push({ modalKey: key, ...value })
    }

    return snappshotsArray
  },

  hideModal(modal = null) {
    // When modal is provided, it means a specific modal needs to be hidden.
    // Otherwise the last one gets hidden by default.
    if (modal) {
      validate(VALIDATE.HIDE_MODAL, modal)

      const modalKey = modal
      const doesTargetModalExist = this.snappshots.has(modalKey)

      if (!doesTargetModalExist) {
        throw new Error(
          "Reoverlay: Snappshot not found. You're probably trying to hide a modal that does not exist."
        )
      } else {
        const snappshot = this.snappshots.get(modalKey)
        this.applyModal({
          ...snappshot,
          modalKey,
          type: EVENT.HIDE_MODAL,
        })
      }
    } else {
      const snappshotsArray = this.getSnappshotsArray()
      const lastSnappshot = getLastElement(snappshotsArray) || null

      if (lastSnappshot) {
        this.applyModal({ ...lastSnappshot, type: EVENT.HIDE_MODAL })
      } else {
        console.error("Reoverlay: There's no active modal to be hidden.")
      }
    }
  },

  hideAll() {
    this.applyModal({ type: EVENT.HIDE_ALL })
  },

  applyModal({ component, props, modalKey, type }) {
    switch (type) {
      case EVENT.SHOW_MODAL:
        this.snappshots.set(modalKey, { component, props })
        break
      case EVENT.HIDE_ALL:
        this.snappshots.clear()
        break
      default:
        this.snappshots.delete(modalKey)
        break
    }

    const snappshotsArray = this.getSnappshotsArray()
    eventManager.emit(EVENT.CHANGE_MODAL, snappshotsArray)
  },
}

export default Reoverlay
