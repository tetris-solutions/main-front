import {getUserCompanies} from '../api/get-user-companies'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'

/**
 * loads a list of user companies and saving it into the passed tree as `tree.user.companies`
 * @param {Baobab} tree state tree
 * @param {Object} [req] express request
 * @returns {Promise.<Array>} promise that resolves once action is complete
 */
export function getUserCompaniesAction (tree, req) {
  return getUserCompanies(getApiFetchConfig(tree, req))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set(['user', 'companies'], response.data)
      tree.commit()
    })
}

export default getUserCompaniesAction
