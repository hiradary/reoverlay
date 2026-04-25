export const getLastElement = <TValue>(array: TValue[]) => array[array.length - 1]

export const isArrayUnique = <TValue>(array: TValue[]) => new Set(array).size === array.length

export const isString = (value: unknown): value is string =>
  typeof value === 'string' || value instanceof String

export const isModalLikeObject = (value: unknown) =>
  typeof value === 'object' && value !== null && '$$typeof' in value
