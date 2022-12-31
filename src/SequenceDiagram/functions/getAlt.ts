import { MessageStore } from '../lib/MessageStore'

export type Alt = {
  alt: {
    then: (msg: string, cb: () => void) => void
  }
  else: {
    then: (msg: string, cb: () => void) => void
  }
  opt: {
    then: (msg: string, cb: () => void) => void
  }
}

export const getAlt = (store: MessageStore) => {
  const alt = {
    then: (msg: string, cb: () => void) => {
      store.unsetIndent()
      store.add(`  alt ${msg}\n`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`  end\n`)
    },
  }

  const _else = {
    then: (msg: string, cb: () => void) => {
      store.unsetIndent()
      store.add(`  else ${msg}\n`)
      store.setIndent()
      cb()
    },
  }

  const opt = {
    then: (msg: string, cb: () => void) => {
      store.unsetIndent()
      store.add(`  opt ${msg}\n`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`  end\n`)
    },
  }

  const main = {
    alt,
    else: _else,
    opt,
  } satisfies Alt

  return main
}
