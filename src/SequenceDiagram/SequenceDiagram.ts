import { Activation, getActivation } from './functions/getActivation'
import { Alt, getAlt } from './functions/getAlt'
import {
  getBackgroundHighlight,
  BackgroundHighlight,
} from './functions/getBackgroundHighlight'
import { Break, getBreak } from './functions/getBreak'
import {
  CriticalRegion,
  getCriticalRegion,
} from './functions/getCriticalRegion'
import { getLoops, Loops } from './functions/getLoops'
import { Message, getMessage } from './functions/getMessage'
import { getNote, Note } from './functions/getNote'
import { getParallel, Parallel } from './functions/getParallel'
import { MessageStore, Options } from './lib/MessageStore'
import { MemberObject } from './types/index'

export type SequenceDiagram<Members extends string> = Message<Members> &
  Note<Members> &
  Activation<Members> &
  Loops &
  Alt &
  Parallel &
  CriticalRegion &
  Break &
  BackgroundHighlight

export const SequenceDiagram = <Members extends string>(
  memberObj: MemberObject,
  options?: Partial<Options>,
) => {
  const members = Object.keys(memberObj) as Members[]

  const store = new MessageStore(memberObj, options)

  // Messages
  const message = getMessage<Members>(members, store)

  // Activations
  // 省略記法はMessage側にまとめている
  const activate = getActivation<Members>(members, store)

  // Note
  const note = getNote<Members>(members, store)

  // Loops
  const loops = getLoops(store)

  // Alt
  const alt = getAlt(store)

  // Parallel
  // 同時並行的に発生すること
  const parallel = getParallel(store)

  // Critical Region
  // It is possible to show actions that must happen automatically with conditional handling of circumstances.
  const criticalRegion = getCriticalRegion(store)

  // Break
  // It is possible to indicate a stop of the sequence within the flow (usually used to model exceptions).
  const seqBreak = getBreak(store)

  const backgroundHighlight = getBackgroundHighlight(store)

  const main = {
    ...message,
    ...note,
    ...activate,
    ...loops,
    ...alt,
    ...parallel,
    ...criticalRegion,
    ...seqBreak,
    ...backgroundHighlight,
  } satisfies SequenceDiagram<Members>

  return { d: main, render: store }
}
