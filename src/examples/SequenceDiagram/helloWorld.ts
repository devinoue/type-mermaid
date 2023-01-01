import { SequenceDiagram } from '../../SequenceDiagram'
import { MemberObject } from '../../SequenceDiagram/types'

//
const member = {
  Bob: 'actor',
  Alice: 'participant',
  John: 'participant',
} satisfies MemberObject

const { d, render } = SequenceDiagram<keyof typeof member>(member)

// Morning greetings
d.Alice.call.Bob.msg('Hi!')
d.Bob.response.Alice.msg('HI!! Alice')
d.John.call.Bob.msg('Fuck')
d.John.failureCall.Alice.msg('Hi!')
