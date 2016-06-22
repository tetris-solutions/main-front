import {loadAccount} from '../api/load-account'
import {saveResponseTokenAsCookie} from '@tetris/front-server/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from '@tetris/front-server/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from '@tetris/front-server/lib/functions/push-response-error-to-state'

export function loadAccountAction (tree, id, token) {
  return loadAccount(id, getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set(['accounts', id], response.data)
      tree.commit()
      return response
    })
    .catch(pushResponseErrorToState(tree))
}

export function loadAccountActionServerAdaptor (req, res) {
  return loadAccountAction(res.locals.tree, req.params.account, req.authToken)
}

export function loadAccountActionRouterAdaptor (state, tree) {
  return loadAccountAction(tree, state.params.account)
}
