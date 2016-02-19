import {POST} from '@tetris/http'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import merge from 'lodash/merge'

/**
 * fires a call to login api returning a promise
 * @param {string} email user email
 * @param {string} password user password
 * @param {Object} config fetch config
 * @returns {Promise} promise that resolves to a fetch response
 */
export function login (email, password, config) {
  return Promise.resolve().then(() => {
    if (!email) throw new MissingRequiredFieldError('email')
    if (!password) throw new MissingRequiredFieldError('password')

    return POST(`${process.env.USER_API_URL}/login`, merge({}, config, {
      body: {email, password}
    }))
  })
}

export default login
