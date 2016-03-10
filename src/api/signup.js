import {POST} from '@tetris/http'
import {validateUser} from '../functions/validate-user'
import assign from 'lodash/assign'

/**
 * validate user then send a POST request to the signup user api
 * @param {Object} user new user object
 * @param {Object} config request config object
 * @returns {Promise} promise that resolves once action is complete
 */
export function signup (user, config) {
  const send = () => POST(
    `${process.env.USER_API_URL}/user`,
    assign({body: user}, config)
  )

  return validateUser(user).then(send)
}

export default signup
