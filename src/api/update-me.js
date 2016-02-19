import {PUT} from '@tetris/http'
import {validateUser} from '../functions/validate-user'
import merge from 'lodash/merge'

/**
 * validate user then send a PUT request to the update user api
 * @param {Object} user object containing changed user properties
 * @param {Object} config request config object
 * @returns {Promise} promise that resolves once action is complete
 */
export function updateMe (user, config) {
  return validateUser(user, false)
    .then(() => PUT(`${process.env.USER_API_URL}/me`,
      merge({}, config, {body: user})))
}

export default updateMe
