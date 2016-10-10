import {createCompany} from '../api/create-company'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

/**
 * creates a new company
 * @param {Baobab} tree state tree
 * @param {String} name new company name
 * @returns {Promise} resolves once the company is loaded
 */
export function createCompanyAction (tree, name) {
  return createCompany(name, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default createCompanyAction
