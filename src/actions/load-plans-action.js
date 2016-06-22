import {loadPlans} from '../api/load-plans'
import {saveResponseTokenAsCookie} from '@tetris/front-server/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from '@tetris/front-server/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from '@tetris/front-server/lib/functions/push-response-error-to-state'

/**
 * loads the list of plans
 * @param {Baobab} tree state tree
 * @param {String} [token] auth token
 * @returns {Promise} promise that resolves once action is complete
 */
export function loadPlansAction (tree, token) {
  return loadPlans(getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set('plans', response.data)
      tree.commit()
      return response
    })
    .catch(pushResponseErrorToState(tree))
}
/**
 * adaptor to call `loadPlansAction` on the server side
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Promise} action promise
 */
export function loadPlansActionServerAdaptor (req, res) {
  return loadPlansAction(res.locals.tree, req.authToken)
}

/**
 * adaptor to call `loadPlansAction` as an `onEnter` hook
 * @param {Object} state history state
 * @param {Baobab} tree state tree
 * @returns {Promise} promise action
 */
export function loadPlansActionRouterAdaptor (state, tree) {
  return loadPlansAction(tree)
}

export default loadPlansAction
