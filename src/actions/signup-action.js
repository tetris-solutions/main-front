import signup from '../api/signup'
import getApiFetchConfig from '../functions/get-api-fetch-config'

/**
 * makes a call to the signup user api
 * @param {Baobab} tree state tree
 * @param {Object} user user object
 * @returns {Promise} promise that resolves once action is complete
 */
export function signupAction (tree, user) {
  return signup(user, getApiFetchConfig(tree))
}

export default signupAction
