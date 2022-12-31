import { MemberObject } from '../types/index.ts'

export class MessageStore {
  public message: string
  public isIndented: boolean

  constructor(personsObj: MemberObject) {
    this.message = `sequenceDiagram\n`
    this.isIndented = false
    for (const person in personsObj) {
      this.message = this.message + `  ${personsObj[person]} ${person}\n`
    }
  }

  add(msg: string) {
    if (this.isIndented) {
      this.message = this.message + '  ' + msg
    } else {
      this.message = this.message + msg
    }
  }
  print() {
    return this.message
  }
  setIndent() {
    this.isIndented = true
  }
  unsetIndent() {
    this.isIndented = false
  }
}
