import { MessageStore } from '../lib/MessageStore'

export type Activation<Members extends string> = {
  activate: {
    [member in Members]: { then: (cb: () => void) => void }
  }
}

export const getActivation = <Members extends string>(
  members: readonly Members[],
  store: MessageStore,
) => {
  const main = {
    activate: {},
  } as Activation<Members>

  members.forEach((member) => {
    main.activate[member] = {
      then: (cb: () => void) => {
        store.add(`activate ${member}`)
        cb()
        store.add(`deactivate ${member}`)
      },
    }
  })
  return main
}
