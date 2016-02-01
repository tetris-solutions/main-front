import isObject from 'lodash/isObject'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import InvalidArgumentError from '../exceptions/InvalidArgumentError'

/**
 *
 * @param user
 * @param requiresPassword
 * @param config
 */
export default (user, requiresPassword = true) => Promise.resolve().then(() => {
  if (!isObject(user) || !user) {
    throw new InvalidArgumentError('user')
  }
  if (!user.email) {
    throw new MissingRequiredFieldError('email')
  }
  if (requiresPassword && !user.password) {
    throw new MissingRequiredFieldError('password')
  }
  if (!user.name) {
    throw new MissingRequiredFieldError('name')
  }
})
