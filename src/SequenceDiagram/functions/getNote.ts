import { MessageStore } from '../lib/MessageStore'

type Action = {
  msg: (msg: string) => void
}
type ParticipantAction<Members extends string> = {
  [member in Members]: Action
}

type OverPtoP<Members extends string> = {
  [member in Members]: ParticipantAction<Members>
}
export type Note<Members extends string> = {
  note: {
    leftOf: ParticipantAction<Members>
    over: OverPtoP<Members>
    rightOf: ParticipantAction<Members>
  }
}

type Direction = 'right' | 'left'

export const getNote = <Members extends string>(
  members: readonly Members[],
  store: MessageStore,
) => {
  const main = { note: {} } as Note<Members>

  // Note right of A: msg
  // Note left of A: msg
  const action = (direction: Direction) => {
    const obj = {} as ParticipantAction<Members>

    members.forEach((member) => {
      obj[member] = {
        msg: (msg: string) => {
          return store.add(`Note ${direction} of ${member}: ${msg}`)
        },
      }
    })
    return obj
  }
  main.note.rightOf = action('right')
  main.note.leftOf = action('left')

  // Note over A: msg
  // Or
  // Note over A, B: msg
  main.note.over = {} as OverPtoP<Members>

  const setNoteOver = (fromMember: Members) => {
    const obj = {} as ParticipantAction<Members>

    members.forEach((toMember) => {
      obj[toMember] = {
        msg: (msg: string) => {
          return store.add(`Note over ${fromMember},${toMember}: ${msg}`)
        },
      }
    })
    return obj
  }

  members.forEach((member) => {
    main.note.over[member] = {
      ...setNoteOver(member),
      msg: (msg: string) => {
        return store.add(`Note over ${member}: ${msg}`)
      },
    }
  })
  return main
}
