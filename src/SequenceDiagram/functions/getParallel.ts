import { MessageStore } from '../lib/MessageStore'

export type Parallel<Member extends string> = {
  and: {
    [person in Member]: {
      to: {
        [person in Member]: {
          then: (cb: () => void) => void
        }
      }
    }
  }
  par: {
    [person in Member]: {
      to: {
        [person in Member]: {
          then: (cb: () => void) => void
        }
      }
    }
  }
}

export const getParallel = <Member extends string>(
  persons: readonly Member[],
  store: MessageStore,
) => {
  const main = {
    par: {},
    and: {},
  } as Parallel<Member>

  const parThen = (fromPerson: Member) => {
    const obj = {} as {
      [person in Member]: { then: (cb: () => void) => void }
    }
    persons.forEach((toPerson) => {
      obj[toPerson] = {
        then: (cb: () => void) => {
          store.add(`  par ${fromPerson} to ${toPerson}\n`)
          store.setIndent()
          cb()
          store.unsetIndent()
          return store.add(`  end\n`)
        },
      }
    })
    return obj
  }

  const andSet = (fromPerson: Member) => {
    const obj = {} as {
      [person in Member]: { then: (cb: () => void) => void }
    }
    persons.forEach((toPerson) => {
      obj[toPerson] = {
        then: (cb: () => void) => {
          store.unsetIndent()
          store.add(`  and ${fromPerson} to ${toPerson}\n`)
          store.setIndent()
          cb()
        },
      }
    })
    return obj
  }

  persons.forEach((person) => {
    main.par[person] = {
      to: parThen(person),
    }
    main.and[person] = {
      to: andSet(person),
    }
  })
  return main
}
