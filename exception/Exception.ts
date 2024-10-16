export default class Exception extends Error {
  details: object
  code: number
  constructor (code: number, message: string, details: any = null) {
    super()
    this.code = code
    this.message = message
    this.details = details
  }
}
