import { SequenceDiagram } from '../../SequenceDiagram'
import { MemberObject } from '../../SequenceDiagram/types'

const member = {
  User: 'actor',
  'AWS CloudFront': 'participant',
  'AWS Lambda': 'participant',
} satisfies MemberObject

const options = {
  autoNumber: true,
}

const { d, render } = SequenceDiagram<keyof typeof member>(member, options)

d.User.call['AWS CloudFront'].activate(
  'GET /hello<br>Host: {distribution}.cloudfront.net',
)
d['AWS CloudFront'].call['AWS Lambda'].activate('handle(event)')
d['AWS Lambda'].call['AWS Lambda'].msg('Run handler')
d['AWS Lambda'].response['AWS CloudFront'].deactivate('status: 200')
d['AWS CloudFront'].response.User.deactivate('HTTP/1.1 200')

console.log(render.toString())
