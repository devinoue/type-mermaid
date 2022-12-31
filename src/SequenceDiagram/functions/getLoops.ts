import { MessageStore } from '../lib/MessageStore'

export type Loops = {
  loop: {
    then: (msg: string, cb: () => void) => void
  }
}

export const getLoops = (store: MessageStore) => {
  const loop = {
    then: (msg: string, cb: () => void) => {
      store.add(`  loop ${msg}\n`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`  end\n`)
    },
  }

  const main = {
    loop,
  } satisfies Loops

  return main
}
