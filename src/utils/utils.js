export const isString = (value) => typeof value === 'string' || value instanceof String

export const isFunction = (functionToCheck) =>
  functionToCheck && {}.toString.call(functionToCheck) === '[object Function]'

export const isArray = (value) => Array.isArray(value)

export const isObject = (value) => value === Object(value)

export const getLastElement = (array) => array[array.length - 1]

export const removeLastElement = (array) => array.slice(0, -1)

export const isArrayUnique = (array) => {
  return !array.some((item) => {
    return array.filter((_item) => item === _item).length > 1
  })
}
