import {loadPermissions} from '../api/load-permissions'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'
import {pushResponseErrorToState} from '../functions/push-response-error-to-state'

/**
 * loads the list of permissions
 * @param {Baobab} tree state tree
 * @param {String} [token] auth token
 * @returns {Promise} promise that resolves once action is complete
 */
export function loadPermissionsAction (tree, token) {
  return loadPermissions(getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set('permissions', response.data)
      tree.commit()
    })
    .catch(pushResponseErrorToState(tree))
}
/**
 * adaptor to call `loadPermissionsAction` on the server side
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Promise} action promise
 */
export function loadPermissionsActionServerAdaptor (req, res) {
  return loadPermissionsAction(res.locals.tree, req.authToken)
}

/**
 * adaptor to call `loadPermissionsAction` as an `onEnter` hook
 * @param {Object} state history state
 * @param {Baobab} tree state tree
 * @returns {Promise} promise action
 */
export function loadPermissionsActionRouterAdaptor (state, tree) {
  return loadPermissionsAction(tree)
}

export default loadPermissionsAction
