import { MessageStore } from '../lib/MessageStore'

export type Loops = {
  loop: {
    then: (msg: string, cb: () => void) => void
  }
}

export const getLoops = (store: MessageStore) => {
  const loop = {
    then: (msg: string, cb: () => void) => {
      store.add(`loop ${msg}`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`end`)
    },
  }

  const main = {
    loop,
  } satisfies Loops

  return main
}
