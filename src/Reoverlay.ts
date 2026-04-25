import { EVENT, VALIDATE } from './constants'
import type { ActiveModal, ModalConfigItem, ModalProps, ModalRenderable } from './types'
import { eventManager, getLastElement, validate } from './utils'

type ModalSnapshot<P extends ModalProps = ModalProps> = Omit<ActiveModal<P>, 'modalKey'>

let modalId = 0

const createModalKey = () => {
  modalId += 1
  return `reoverlay-${modalId}`
}

const Reoverlay = {
  modals: new Map<string, ModalRenderable>(),
  snapshots: new Map<string, ModalSnapshot<any>>(),

  config(configData: ModalConfigItem[] = []) {
    validate(VALIDATE.CONFIG, configData)

    configData.forEach((item) => {
      this.modals.set(item.name, item.component)
    })
  },

  showModal<P extends ModalProps = ModalProps>(
    modal: ModalRenderable<P> | string,
    props = {} as P
  ) {
    const modalType = validate(VALIDATE.SHOW_MODAL, modal)

    if (modalType === 'string') {
      const modalKey = modal as string
      const modalElement = this.modals.get(modalKey)

      if (!modalElement) {
        throw new Error(
          `Reoverlay: Modal not found. Make sure "${modalKey}" has been passed to Reoverlay.config().`
        )
      }

      this.applyModal({
        component: modalElement,
        modalKey,
        props,
        type: EVENT.SHOW_MODAL,
      })
      return
    }

    this.applyModal({
      component: modal as ModalRenderable<P>,
      modalKey: createModalKey(),
      props,
      type: EVENT.SHOW_MODAL,
    })
  },

  getSnapshotsArray() {
    return Array.from(this.snapshots.entries()).map(([modalKey, value]) => ({
      modalKey,
      ...value,
    }))
  },

  hideModal(modal: string | null = null) {
    if (modal) {
      validate(VALIDATE.HIDE_MODAL, modal)

      const modalKey = modal
      const snapshot = this.snapshots.get(modalKey)

      if (!snapshot) {
        throw new Error("Reoverlay: Snapshot not found. You're trying to hide a missing modal.")
      }

      this.applyModal({
        ...snapshot,
        modalKey,
        type: EVENT.HIDE_MODAL,
      })
      return
    }

    const lastSnapshot = getLastElement(this.getSnapshotsArray()) ?? null

    if (lastSnapshot) {
      this.applyModal({ ...lastSnapshot, type: EVENT.HIDE_MODAL })
      return
    }

    console.error("Reoverlay: There's no active modal to be hidden.")
  },

  hideAll() {
    this.applyModal({ type: EVENT.HIDE_ALL })
  },

  applyModal({
    component,
    modalKey,
    props,
    type,
  }: Partial<ActiveModal<any>> & { type: (typeof EVENT)[keyof typeof EVENT] }) {
    switch (type) {
      case EVENT.SHOW_MODAL:
        if (component && modalKey) {
          this.snapshots.set(modalKey, { component, props: props ?? {} })
        }
        break
      case EVENT.HIDE_ALL:
        this.snapshots.clear()
        break
      default:
        if (modalKey) {
          this.snapshots.delete(modalKey)
        }
        break
    }

    eventManager.emit(EVENT.CHANGE_MODAL, this.getSnapshotsArray())
  },
}

export default Reoverlay
