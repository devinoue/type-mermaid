import { MemberObject } from '../types'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { run } from '@mermaid-js/mermaid-cli'

import { promises as fs } from 'fs'
import path from 'path'

export type Options = {
  autoNumber: boolean
  indent: string
}

export const defaultOptions = {
  autoNumber: false,
  indent: '    ',
}

export class MessageStore {
  private message: string
  private isIndented: boolean
  private options: Options
  private indentCount = 0

  constructor(
    membersObj: MemberObject,
    options: Partial<Options> = defaultOptions,
  ) {
    this.options = defaultOptions
    this.options.autoNumber = options.autoNumber
      ? options.autoNumber
      : defaultOptions.autoNumber
    this.options.indent = options.indent
      ? options.indent
      : defaultOptions.indent

    this.message = `sequenceDiagram\n`
    this.indentCount = 1
    if (this.options.autoNumber === true) {
      this.add(`autonumber`)
    }
    this.isIndented = false

    for (const member in membersObj) {
      this.add(`${membersObj[member]} ${member}`)
    }
  }

  add(msg: string) {
    const indent = this.options.indent

    this.message = this.message + indent.repeat(this.indentCount) + msg + `\n`
  }
  setIndent() {
    this.isIndented = true
    this.indentCount = this.indentCount + 1
  }
  unsetIndent() {
    this.isIndented = false
    this.indentCount = this.indentCount - 1
  }

  toString() {
    return this.message
  }
  toMmd(pathString: string) {
    return fs.writeFile(pathString, this.toString())
  }

  async toSvg(pathString: string) {
    const tmpPath = path.join(__dirname, './_tmp.mmd')
    await fs.writeFile(tmpPath, this.toString())
    await run(tmpPath, pathString)
  }
}
