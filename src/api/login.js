import {POST} from '@tetris/http'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'

/**
 * fires a call to login api returning a promise
 * @param email
 * @param password
 * @returns Promise
 */
export default (email, password) => new Promise((resolve, reject) => {
  if (!email) throw new MissingRequiredFieldError('email')
  if (!password) throw new MissingRequiredFieldError('password')

  return POST(`${process.env.USER_API_URL}/login`, {
    body: {email, password}
  }).then(resolve, reject)
})
