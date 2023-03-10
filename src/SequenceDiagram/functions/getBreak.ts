import { MessageStore } from '../lib/MessageStore'

/**
 * Break
 * It is possible to indicate a stop of the sequence within the flow (usually used to model exceptions).
 * https://mermaid.js.org/syntax/sequenceDiagram.html#break
 */
export type Break = {
  breakWhen: {
    then: (msg: string, cb: () => void) => void
  }
}

export const getBreak = (store: MessageStore) => {
  const breakWhen = {
    then: (msg: string, cb: () => void) => {
      store.add(`break ${msg}`)
      store.setIndent()
      cb()
      store.unsetIndent()
      return store.add(`end`)
    },
  }

  const main = {
    breakWhen,
  }
  return main satisfies Break
}
