import {createRole} from '../api/create-role'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

/**
 * creates a new role
 * @param {Baobab} tree state tree
 * @param {String} company the company id
 * @param {String} name new role name
 * @returns {Promise} resolves once the role is loaded
 */
export function createRoleAction (tree, company, name) {
  return createRole(company, name, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default createRoleAction
