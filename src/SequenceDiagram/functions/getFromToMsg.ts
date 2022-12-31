import { MessageStore } from '../lib/MessageStore'

export type Action = {
  activate: (msg: string) => void
  deactivate: (msg: string) => void
  msg: (msg: string) => void
}

type MessageArrow =
  | 'to'
  | 'dotted'
  | 'line'
  | 'dottedArrow'
  | 'cross'
  | 'dottedCross'
  | 'openArrow'
  | 'dottedOpenArrow'
type ArrowList<Member extends string> = {
  [arrow in MessageArrow]: {
    [person2 in Member]: Action
  }
}

export type FromToMsg<Member extends string> = {
  [person in Member]: ArrowList<Member>
}

export const getFromToMsg = <Member extends string>(
  persons: readonly Member[],
  store: MessageStore,
) => {
  const main = {} as FromToMsg<Member>
  const action = (fromPerson: Member, sign: string) => {
    const obj = {} as { [person in Member]: Action }
    persons.forEach((toPerson) => {
      obj[toPerson] = {
        msg: (msg: string) => {
          return store.add(`  ${fromPerson}${sign}${toPerson}: ${msg}\n`)
        },
        activate: (msg: string) => {
          return store.add(`  ${fromPerson}${sign}+${toPerson}: ${msg}\n`)
        },
        deactivate: (msg: string) => {
          return store.add(`  ${fromPerson}${sign}-${toPerson}: ${msg}\n`)
        },
      }
    })
    return obj
  }

  persons.forEach((person) => {
    main[person] = {
      line: action(person, '->'),
      to: action(person, '->>'),
      dotted: action(person, '-->'),
      dottedArrow: action(person, '-->>'),
      cross: action(person, '-x'),
      dottedCross: action(person, '--x'),
      openArrow: action(person, '-)'),
      dottedOpenArrow: action(person, '--)'),
    }
  })
  return main
}
