import {POST} from '@tetris/http'
import isObject from 'lodash/isObject'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import InvalidArgumentError from '../exceptions/InvalidArgumentError'

/**
 * fires a call to the signup api returning a promise
 * @param user
 * @returns Promise
 */
export default user => new Promise((resolve, reject) => {
  if (!isObject(user) || !user) throw new InvalidArgumentError('user')
  const {email, password, name} = user
  if (!email) throw new MissingRequiredFieldError('email')
  if (!password) throw new MissingRequiredFieldError('password')
  if (!name) throw new MissingRequiredFieldError('name')

  return POST(`${process.env.USER_API_URL}/user`, {
    body: {email, password, name}
  }).then(resolve, reject)
})
