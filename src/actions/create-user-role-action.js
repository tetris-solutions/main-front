import {createUserRole} from '../api/create-user-role'
import {saveResponseTokenAsCookie} from 'tetris-iso/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from 'tetris-iso/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from 'tetris-iso/lib/functions/push-response-error-to-state'

/**
 * calls the create user role api
 * @param {Baobab} tree state tree
 * @param {String} email email to send the invitation to
 * @param {String} role role id
 * @returns {Promise} promise that resolves once action is complete
 */
export function createUserRoleAction (tree, email, role) {
  return createUserRole(email, role, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default createUserRoleAction
