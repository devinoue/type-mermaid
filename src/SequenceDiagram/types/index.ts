export type ActorSymbol = 'participant' | 'actor'

export type MemberObject = {
  readonly [name: string]: ActorSymbol
}
