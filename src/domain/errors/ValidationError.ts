export class ValidationError extends Error {
  constructor(message?: string) {
    super(message)
    this.name = ''
    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}
