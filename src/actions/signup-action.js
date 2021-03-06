import {signup} from '../api/signup'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

/**
 * makes a call to the signup user api
 * @param {Baobab} tree state tree
 * @param {Object} user user object
 * @returns {Promise} promise that resolves once action is complete
 */
export function signupAction (tree, user) {
  return signup(user, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default signupAction
