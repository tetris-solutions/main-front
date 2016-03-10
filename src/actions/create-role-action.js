import {createRole} from '../api/create-role'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import {getApiFetchConfig} from '../functions/get-api-fetch-config'

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
}

export default createRoleAction
