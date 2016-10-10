import {saveResponseTokenAsCookie} from 'tetris-iso/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from 'tetris-iso/lib/functions/get-api-fetch-config'
import {updateRole} from '../api/update-role'
import {pushResponseErrorToState} from 'tetris-iso/lib/functions/push-response-error-to-state'

/**
 * calls the update role api
 * @param {Baobab} tree state tree
 * @param {String} id role id
 * @param {String} name new role name
 * @param {Array.<String>} permissions updated list of permissions
 * @returns {Promise} promise that resolves once action is complete
 */
export function updateRoleAction (tree, id, name, permissions) {
  return updateRole(id, name, permissions, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default updateRoleAction
