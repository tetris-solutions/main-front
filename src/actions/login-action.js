import {login} from '../api/login'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

/**
 * fires request to login API and save user object in the state tree on success
 * @param {Baobab} tree state tree
 * @param {string} email user email
 * @param {string} password user password
 * @returns {Promise} promise that resolves once action is complete
 */
export function loginAction (tree, email, password) {
  return login(email, password, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default loginAction
