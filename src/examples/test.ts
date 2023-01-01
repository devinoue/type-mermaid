import { SequenceDiagram } from '../SequenceDiagram'
import { MemberObject } from '../SequenceDiagram/types'

import path from 'path'

const member = {
  Alice: 'participant',
  Bob: 'actor',
  'Inner Bob': 'actor',
} satisfies MemberObject

const options = {
  autoNumber: true,
}

const { d, render } = SequenceDiagram<keyof typeof member>(member, options)

// Morning greetings
d.Alice.call.Bob.activate('これでいい？')
d.rect.then('rgb(200, 150, 255)', () => {
  d.Alice.call.Bob.activate('これでいい？')
})

// on console
console.log(render.toString())
;(async function () {
  // by MMD file
  const mmdPath = path.join(__dirname, './test.mmd')
  await render.toMmd(mmdPath)

  // by SVG file
  const svgPath = path.join(__dirname, './test.svg')
  await render.toSvg(svgPath)
})()
