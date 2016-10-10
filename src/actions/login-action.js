import {login} from '../api/login'
import {saveResponseTokenAsCookie} from 'tetris-iso/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from 'tetris-iso/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from 'tetris-iso/lib/functions/push-response-error-to-state'

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
    .then(response => {
      tree.set('user', response.data)
      tree.commit()
      return response
    })
    .catch(pushResponseErrorToState(tree))
}

export default loginAction
