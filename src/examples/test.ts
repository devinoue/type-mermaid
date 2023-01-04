import { SequenceDiagram } from '../SequenceDiagram'
import { MemberObject } from '../SequenceDiagram/types'

const member = {
  Alice: 'participant',
  Bob: 'participant',
} satisfies MemberObject

const { d, render } = SequenceDiagram<keyof typeof member>(member)

d.Alice.call.Bob.msg('How are you?')
d.Bob.response.Alice.msg('Great!')

console.log(render.toString())
