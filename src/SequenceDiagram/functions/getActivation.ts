import { MessageStore } from '../lib/MessageStore'

export type Activation<Member extends string> = {
  activate: {
    [person in Member]: { then: (cb: () => void) => void }
  }
}

export const getActivation = <Member extends string>(
  persons: readonly Member[],
  store: MessageStore,
) => {
  const main = {
    activate: {},
  } as Activation<Member>

  persons.forEach((person) => {
    main.activate[person] = {
      then: (cb: () => void) => {
        store.add(`  activate ${person}\n`)
        cb()
        store.add(`  deactivate ${person}\n`)
      },
    }
  })
  return main
}
