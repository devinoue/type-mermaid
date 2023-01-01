import { MessageStore } from '../lib/MessageStore'

type Action = {
  then: (msg: string, cb: () => void) => void
}
export type Alt = {
  alt: Action
  else: Action
  opt: Action
}

export const getAlt = (store: MessageStore) => {
  const alt = {
    then: (msg: string, cb: () => void) => {
      store.add(`alt ${msg}`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`end`)
    },
  }

  const _else = {
    then: (msg: string, cb: () => void) => {
      store.unsetIndent()
      store.add(`else ${msg}`)
      store.setIndent()
      cb()
    },
  }

  const opt = {
    then: (msg: string, cb: () => void) => {
      store.add(`opt ${msg}`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`end`)
    },
  }

  const main = {
    alt,
    else: _else,
    opt,
  } satisfies Alt

  return main
}
