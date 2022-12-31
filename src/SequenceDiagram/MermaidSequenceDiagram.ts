import { Activation, getActivation } from './functions/getActivation'
import { Alt, getAlt } from './functions/getAlt'
import { Break, getBreak } from './functions/getBreak'
import {
  CriticalRegion,
  getCriticalRegion,
} from './functions/getCriticalRegion'
import { FromToMsg, getFromToMsg } from './functions/getFromToMsg'
import { getLoops, Loops } from './functions/getLoops'
import { getNote, Note } from './functions/getNote'
import { getParallel, Parallel } from './functions/getParallel'
import { MessageStore } from './lib/MessageStore'
import { MemberObject } from './types/index'
export type SequenceDiagram<Member extends string> = FromToMsg<Member> &
  Note<Member> &
  Activation<Member> &
  Loops &
  Alt &
  Parallel<Member> &
  CriticalRegion &
  Break

export const MermaidSequenceDiagram = <Member extends string>(
  memberObj: MemberObject,
) => {
  const persons = [...Object.keys(memberObj)] as Member[]

  const store = new MessageStore(memberObj)

  // Messages
  const fromToMsg = getFromToMsg<Member>(persons, store)

  // Activations
  // 省略記法はMessage側にまとめている
  const activate = getActivation<Member>(persons, store)

  // Note
  const note = getNote<Member>(persons, store)

  // Loops
  const loops = getLoops(store)

  // Alt
  const alt = getAlt(store)

  // Parallel
  // 同時並行的に発生すること
  const parallel = getParallel<Member>(persons, store)

  // Critical Region
  // It is possible to show actions that must happen automatically with conditional handling of circumstances.
  const criticalRegion = getCriticalRegion(store)

  // Break
  // It is possible to indicate a stop of the sequence within the flow (usually used to model exceptions).
  const seqBreak = getBreak(store)

  const main = {
    ...fromToMsg,
    ...note,
    ...activate,
    ...loops,
    ...alt,
    ...parallel,
    ...criticalRegion,
    ...seqBreak,
  }

  const render = () => {
    return store.print()
  }

  return { d: main, render }
}
