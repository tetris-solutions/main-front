import {loadCompanyPermissions} from '../api/load-company-permissions'
import {saveResponseTokenAsCookie} from 'tetris-iso/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from 'tetris-iso/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from 'tetris-iso/lib/functions/push-response-error-to-state'

/**
 * loads the list of permissions
 * @param {String} company company ID
 * @param {Baobab} tree state tree
 * @param {String} [token] auth token
 * @returns {Promise} promise that resolves once action is complete
 */
export function loadCompanyPermissionsAction (company, tree, token) {
  return loadCompanyPermissions(company, getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set(['companies', company, 'permissions'], response.data)
      tree.commit()
      return response
    })
    .catch(pushResponseErrorToState(tree))
}
/**
 * adaptor to call `loadCompanyPermissionsAction` on the server side
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Promise} action promise
 */
export function loadCompanyPermissionsActionServerAdaptor (req, res) {
  return loadCompanyPermissionsAction(req.params.company, res.locals.tree, req.authToken)
}

/**
 * adaptor to call `loadCompanyPermissionsAction` as an `onEnter` hook
 * @param {Object} state history state
 * @param {Baobab} tree state tree
 * @returns {Promise} promise action
 */
export function loadCompanyPermissionsActionRouterAdaptor (state, tree) {
  return loadCompanyPermissionsAction(state.params.company, tree)
}

export default loadCompanyPermissionsAction
