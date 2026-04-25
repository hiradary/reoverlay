type Listener<TPayload> = (payload: TPayload) => void

const eventManager = (() => {
  const subscribers = new Map<string, Set<Listener<unknown>>>()

  const on = <TPayload>(eventName: string, callback: Listener<TPayload>) => {
    if (!subscribers.has(eventName)) {
      subscribers.set(eventName, new Set())
    }

    const listeners = subscribers.get(eventName)
    listeners?.add(callback as Listener<unknown>)

    return () => off(eventName, callback)
  }

  const off = <TPayload>(eventName?: string, callback?: Listener<TPayload>) => {
    if (!eventName) {
      subscribers.clear()
      return
    }

    if (!callback) {
      subscribers.delete(eventName)
      return
    }

    const listeners = subscribers.get(eventName)
    listeners?.delete(callback as Listener<unknown>)

    if (listeners?.size === 0) {
      subscribers.delete(eventName)
    }
  }

  const emit = <TPayload>(eventName: string, payload: TPayload) => {
    subscribers.get(eventName)?.forEach((callback) => {
      callback(payload)
    })
  }

  const listenerCount = (eventName: string) => subscribers.get(eventName)?.size ?? 0

  return {
    emit,
    listenerCount,
    off,
    on,
  }
})()

export default eventManager
