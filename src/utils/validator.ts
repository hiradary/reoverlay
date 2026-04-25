import { isValidElement } from 'react'

import { VALIDATE } from '../constants'
import type { ModalConfigItem, ModalRenderable } from '../types'
import { isArrayUnique, isModalLikeObject, isString } from './utils'

type ValidationType = (typeof VALIDATE)[keyof typeof VALIDATE]

export type ShowModalValidationResult = 'component' | 'string'

const isRenderableModal = (value: unknown): value is ModalRenderable =>
  typeof value === 'function' || isValidElement(value) || isModalLikeObject(value)

export const validate = (
  type: ValidationType,
  value: unknown
): boolean | ShowModalValidationResult => {
  switch (type) {
    case VALIDATE.CONFIG: {
      if (!Array.isArray(value)) {
        throw new Error(
          'Reoverlay: Config data must be an array. Pass an array to Reoverlay.config().'
        )
      }

      const configData = value as ModalConfigItem[]

      configData.forEach((item) => {
        if (!item.name || !item.component) {
          throw new Error(
            "Reoverlay: Each config item must contain a 'name' and 'component' property."
          )
        }
      })

      const names = configData.map((item) => item.name)
      if (!isArrayUnique(names)) {
        throw new Error('Reoverlay: Modal config names must be unique.')
      }

      return true
    }

    case VALIDATE.SHOW_MODAL: {
      const throwError = () => {
        throw new Error(
          "Reoverlay: Method 'showModal' requires a React component, React element, or configured modal name."
        )
      }

      if (!value) throwError()
      if (isString(value)) return 'string'
      if (isRenderableModal(value)) return 'component'

      throwError()
      return false
    }

    case VALIDATE.HIDE_MODAL: {
      if (isString(value)) return true

      throw new Error(
        `Reoverlay: Method 'hideModal' accepts an optional string modal name, got ${typeof value}.`
      )
    }

    default:
      return false
  }
}
