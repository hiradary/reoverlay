class eventManager {
  constructor() {
    this.subscribes = new Map()
  }

  on(eventName, callback) {
    if (!this.subscribes.has(eventName)) {
      this.subscribes.set(eventName, [])
    }
    this.subscribes.get(eventName).push(callback)
  }

  off(eventName) {
    this.subscribes.delete(eventName)
  }

  emit(eventName, args) {
    if (!this.subscribes.has(eventName)) return
    this.subscribes.get(eventName).forEach((callback) => callback(args))
  }
}

export default new eventManager()
