export type MemberType = 'participant' | 'actor'

export type MemberObject = {
  readonly [name: string]: MemberType
}
