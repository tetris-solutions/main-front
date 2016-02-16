import {POST} from '@tetris/http'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import merge from 'lodash/merge'

/**
 * fires a call to login api returning a promise
 * @param {string} email user email
 * @param {string} password user password
 * @param {object} config fetch config
 * @returns {Promise} promise that resolves to a fetch response
 */
export default (email, password, config) => new Promise((resolve, reject) => {
  if (!email) throw new MissingRequiredFieldError('email')
  if (!password) throw new MissingRequiredFieldError('password')

  return POST(`${process.env.USER_API_URL}/login`, merge(config, {
    body: {email, password}
  })).then(resolve, reject)
})
