import { MessageStore } from '../lib/MessageStore'

type Action = {
  then: (msg: string, cb: () => void) => void
}
export type Parallel = {
  and: Action
  par: Action
}

export const getParallel = (store: MessageStore) => {
  const par = {
    then: (msg: string, cb: () => void) => {
      store.add(`par ${msg}`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`end`)
    },
  }

  const and = {
    then: (msg: string, cb: () => void) => {
      store.unsetIndent()
      store.add(`and ${msg}`)
      store.setIndent()
      cb()
    },
  }

  const main = {
    par,
    and,
  } satisfies Parallel

  return main
}
