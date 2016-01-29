import curry from 'lodash/curry'
import isObject from 'lodash/isObject'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import InvalidArgumentError from '../exceptions/InvalidArgumentError'

export default curry((fn, user) =>
  new Promise((resolve, reject) => {
    if (!isObject(user) || !user) throw new InvalidArgumentError('user')
    if (!user.email) throw new MissingRequiredFieldError('email')
    if (fn.requiresPassword !== false && !user.password) throw new MissingRequiredFieldError('password')
    if (!user.name) throw new MissingRequiredFieldError('name')

    fn(user).then(resolve, reject)
  }))
