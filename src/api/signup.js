import {POST} from '@tetris/http'
import {validateUser} from '../functions/validate-user'
import merge from 'lodash/merge'

/**
 * validate user then send a POST request to the signup user api
 * @param {Object} user new user object
 * @param {Object} config request config object
 * @returns {Promise} promise that resolves once action is complete
 */
export function signup (user, config) {
  return validateUser(user)
    .then(() => POST(`${process.env.USER_API_URL}/user`,
      merge({}, config, {body: user})))
}

export default signup
