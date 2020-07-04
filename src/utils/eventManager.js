const eventManager = (() => {
  const subscribes = new Map()

  const on = (eventName, callback) => {
    if (!subscribes.has(eventName)) {
      subscribes.set(eventName, [])
    }
    subscribes.get(eventName).push(callback)
  }

  const off = (eventName) => {
    subscribes.delete(eventName)
  }

  const emit = (eventName, args) => {
    if (!subscribes.has(eventName)) return
    subscribes.get(eventName).forEach((callback) => callback(args))
  }

  return {
    on,
    off,
    emit,
  }
})()

export default eventManager
