import {updateRole} from '../api/update-role'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

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
