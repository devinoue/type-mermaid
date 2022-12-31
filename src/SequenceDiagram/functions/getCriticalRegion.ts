import { MessageStore } from '../lib/MessageStore'

export type CriticalRegion = {
  critical: {
    then: (msg: string, cb: () => void) => void
  }
  optionWhenCritical: {
    then: (msg: string, cb: () => void) => void
  }
}

export const getCriticalRegion = (store: MessageStore) => {
  const critical = {
    then: (msg: string, cb: () => void) => {
      store.unsetIndent()
      store.add(`  critical ${msg}\n`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`  end\n`)
    },
  }

  const optionWhenCritical = {
    then: (msg: string, cb: () => void) => {
      store.unsetIndent()
      store.add(`  option ${msg}\n`)
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
