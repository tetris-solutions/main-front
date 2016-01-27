export default class MissingRequiredFieldError extends Error {
  constructor (field) {
    const message = `${field} is required`
    super(message)
    this.message = message
  }
}
MissingRequiredFieldError.displayName = 'MissingRequiredFieldError'
