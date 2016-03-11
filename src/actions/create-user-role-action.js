import {createUserRole} from '../api/create-user-role'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import {getApiFetchConfig} from '../functions/get-api-fetch-config'
import {pushResponseErrorToState} from '../functions/push-response-error-to-state'

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
