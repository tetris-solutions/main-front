import {createCompany} from '../api/create-company'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import {getApiFetchConfig} from '../functions/get-api-fetch-config'

/**
 * creates a new company
 * @param {Baobab} tree state tree
 * @param {String} name new company name
 * @returns {Promise} resolves once the company is loaded
 */
export function createCompanyAction (tree, name) {
  return createCompany(name, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
}

export default createCompanyAction
