import isObject from 'lodash/isObject'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import InvalidArgumentError from '../exceptions/InvalidArgumentError'

/**
 * performs basic user validation
 * @param {Object} user user object
 * @param {boolean} [requiresPassword=true] is password required for this case?
 * @returns {Promise} returns a promise that resolves if the user is valid and rejects otherwise
 */
export function validateUser (user, requiresPassword = true) {
  return Promise.resolve().then(() => {
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
    return user
  })
}

export default validateUser
