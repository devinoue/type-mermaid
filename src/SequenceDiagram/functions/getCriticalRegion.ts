import { MessageStore } from '../lib/MessageStore'

type Action = {
  then: (msg: string, cb: () => void) => void
}

export type CriticalRegion = {
  critical: Action
  optionWhenCritical: Action
}

export const getCriticalRegion = (store: MessageStore) => {
  const critical = {
    /**
     * Use call back function
     * @param msg string
     * @param cb
     * @returns
     */
    then: (msg: string, cb: () => void) => {
      store.add(`critical ${msg}`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`end`)
    },
  }

  const optionWhenCritical = {
    then: (msg: string, cb: () => void) => {
      store.unsetIndent()
      store.add(`option ${msg}`)
      store.setIndent()
      cb()
    },
  }

  const main = {
    critical,
    optionWhenCritical,
  } satisfies CriticalRegion

  return main
}
