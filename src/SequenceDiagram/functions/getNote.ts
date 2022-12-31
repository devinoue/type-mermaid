import { MessageStore } from '../lib/MessageStore'

type OverP2P<Member extends string> = {
  [person in Member]: {
    [person in Member]: {
      msg: (msg: string) => void
    }
  }
}
export type Note<Member extends string> = {
  note: {
    leftOf: {
      [person in Member]: {
        msg: (msg: string) => void
      }
    }
    over: OverP2P<Member>
    rightOf: {
      [person in Member]: {
        msg: (msg: string) => void
      }
    }
  }
}

export const getNote = <Member extends string>(
  persons: readonly Member[],
  store: MessageStore,
) => {
  const note: any = {}

  const action = (direction: string) => {
    const obj: any = {}

    persons.forEach((person) => {
      obj[person] = {}
      obj[person] = {
        msg: (msg: string) => {
          return store.add(`  Note ${direction} of ${person}: ${msg}\n`)
        },
      }
    })
    return obj
  }
  note.rightOf = action('right')
  note.leftOf = action('left')

  // Note over A: msg
  // Note over A,B: msg
  const setNoteOver = (fromPerson: Member) => {
    const obj: any = {}
    persons.forEach((toPerson) => {
      obj[toPerson] = {
        msg: (msg: string) => {
          return store.add(`  Note over ${fromPerson},${toPerson}: ${msg}\n`)
        },
      }
    })
    return obj
  }
  note.over = {}
  persons.forEach((person) => {
    note.over[person] = {
      ...setNoteOver(person),
      msg: (msg: string) => {
        return store.add(`  Note over ${person}: ${msg}\n`)
      },
    }
  })
  return { note } as Note<Member>
}
