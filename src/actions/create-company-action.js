import {createCompany} from '../api/create-company'
import {saveResponseTokenAsCookie} from '@tetris/front-server/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from '@tetris/front-server/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from '@tetris/front-server/lib/functions/push-response-error-to-state'

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
