import {loadCompany} from '../api/load-company'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'

/**
 * loads a single company
 * @param {Baobab} tree state tree
 * @param {String} id company id
 * @param {String} [token] optional auth token
 * @returns {Promise} promise that resolves once action is complete
 */
export function loadCompanyAction (tree, id, token) {
  return loadCompany(id, getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set(['companies', id], response.data)
      tree.commit()
    })
}

/**
 * adaptor to call `loadCompanyAction` on the server side
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Promise} action promise
 */
export function loadCompanyActionServerAdaptor (req, res) {
  return loadCompanyAction(res.locals.tree, req.params.company, req.authToken)
}

/**
 * adaptor to call `loadCompanyAction` as an `onEnter` hook
 * @param {Object} state history state
 * @param {Baobab} tree state tree
 * @returns {Promise} promise action
 */
export function loadCompanyActionRouterAdaptor (state, tree) {
  return loadCompanyAction(tree, state.params.company)
}

export default loadCompanyAction
