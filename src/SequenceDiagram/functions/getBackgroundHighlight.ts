import { MessageStore } from '../lib/MessageStore'

type Action = {
  then: (msg: string, cb: () => void) => void
}
export type BackgroundHighlight = {
  rect: Action
}

export const getBackgroundHighlight = (store: MessageStore) => {
  const rect = {
    then: (msg: string, cb: () => void) => {
      store.add(`rect ${msg}`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`end`)
    },
  }

  const main = {
    rect,
  } satisfies BackgroundHighlight

  return main
}
