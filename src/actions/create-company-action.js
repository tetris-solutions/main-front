import {createCompany} from '../api/create-company'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import {getApiFetchConfig} from '../functions/get-api-fetch-config'

/**
 * creates a new company
 * @param {Baobab} tree state tree
 * @param {Object} company new company object
 * @returns {Promise} resolves once the company is loaded
 */
export function createCompanyAction (tree, company) {
  return createCompany(company, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
}

export default createCompanyAction
