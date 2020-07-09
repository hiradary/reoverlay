import { isValidElement } from 'react'

import { VALIDATE } from '../constants'
import { isArray, isArrayUnique, isString, isFunction } from './utils'

export const validate = (type, value) => {
  switch (type) {
    case VALIDATE.CONFIG: {
      if (!isArray(value)) {
        throw new Error(
          'Reoverlay: Config data is probably not a valid array. Make sure you pass a valid array to the config method'
        )
      }

      // Check if value containts objects with "name" and "component" properties
      value.forEach((item) => {
        if (!item.name || !item.component) {
          throw new Error(
            `Reoverlay: Make sure your config array contains objects with a 'name' and 'component' property.`
          )
        }
      })

      // Check if all "name" properties are unique
      const names = value.map((item) => item.name)
      if (!isArrayUnique(names))
        throw new Error('Reoverlay: Make sure your config array data is unique.')

      return true
    }

    case VALIDATE.SHOW_MODAL: {
      const throwError = () => {
        throw new Error(
          "Reoverlay: Method 'showModal' has one required argument. Please pass on a React Component, or a pre-configuered identifier string."
        )
      }

      if (!value) throwError()
      if (isString(value)) return 'string'
      if (isFunction(value) || isValidElement(value)) return 'component'

      throwError()

      break
    }

    case VALIDATE.HIDE_MODAL: {
      if (isString(value)) return true
      throw new Error(
        `Reoverlay: Method 'hideModal' has one optional argument. Expected a 'string', got a ${typeof value}`
      )
    }
    default:
      return false
  }
}
