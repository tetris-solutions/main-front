export default class InvalidArgumentError extends Error {
  constructor (arg) {
    const message = `${arg} is not a valid argument`
    super(message)
    this.message = message
  }
}
InvalidArgumentError.displayName = 'InvalidArgumentError'
