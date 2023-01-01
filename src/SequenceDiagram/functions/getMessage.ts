import { MessageStore } from '../lib/MessageStore'

type Action = {
  activate: (msg: string) => void
  deactivate: (msg: string) => void
  msg: (msg: string) => void
}

type ParticipantAction<Members extends string> = {
  [member in Members]: Action
}

type MessageSymbolLookupType = { [key: string]: string }
const MessageSymbolLookup1 = {
  line: '->',
  dotted: '-->',
  call: '->>',
  response: '-->>',
  failureCall: '-x',
  failureRes: '--x',
  asyncCall: '-)',
  asyncRes: '--)',
} as const satisfies MessageSymbolLookupType

// const MessageSymbolLookup2: MessageSymbolLookupType = {
//   to: '->>',
//   dotted: '-->',
//   line: '->',
//   dottedArrow: '-->>',
//   cross: '-x',
//   dottedCross: '--x',
//   openArrow: '-)',
//   dottedOpenArrow: '--)',
// }

type MessageType = keyof typeof MessageSymbolLookup1
type MessageTypeValue = typeof MessageSymbolLookup1[MessageType]

type MessageList<Members extends string> = {
  [messageType in MessageType]: ParticipantAction<Members>
}

export type Message<Members extends string> = {
  [member in Members]: MessageList<Members>
}

export const getMessage = <Members extends string>(
  members: readonly Members[],
  store: MessageStore,
) => {
  const main = {} as Message<Members>

  const action = (fromMember: Members, sign: MessageTypeValue) => {
    const obj = {} as ParticipantAction<Members>
    members.forEach((toMember) => {
      obj[toMember] = {
        msg: (msg: string) => {
          return store.add(`${fromMember}${sign}${toMember}: ${msg}`)
        },
        activate: (msg: string) => {
          return store.add(`${fromMember}${sign}+${toMember}: ${msg}`)
        },
        deactivate: (msg: string) => {
          return store.add(`${fromMember}${sign}-${toMember}: ${msg}`)
        },
      }
    })
    return obj
  }

  members.forEach((member) => {
    const messageObj = {} as {
      [messageType in MessageType]: ParticipantAction<Members>
    }
    const symbols = Object.keys(MessageSymbolLookup1) as MessageType[]
    symbols.forEach(
      (symbol) =>
        (messageObj[symbol] = action(member, MessageSymbolLookup1[symbol])),
    )

    main[member] = messageObj
  })
  return main
}
