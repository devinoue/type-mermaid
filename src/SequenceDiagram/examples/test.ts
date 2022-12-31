import { MermaidSequenceDiagram } from '../MermaidSequenceDiagram'
import { MemberObject } from '../types/index'

const memberObj = {
  アリス: 'participant',
  John: 'participant',
  Bob: 'actor',
} satisfies MemberObject

const { d, render } = MermaidSequenceDiagram<keyof typeof memberObj>(memberObj)

// Morning
d.par.Bob.to.John.then(() => {
  d.Bob.to.John.msg('Hello')
  d.John.to.アリス.msg('Hi')
  d.and.Bob.to.アリス.then(() => {
    d.Bob.openArrow.アリス.msg('ハイ')
  })
})

console.log(render())
