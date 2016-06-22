import {loadCompanyApps} from '../api/load-company-apps'
import {saveResponseTokenAsCookie} from '@tetris/front-server/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from '@tetris/front-server/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from '@tetris/front-server/lib/functions/push-response-error-to-state'

export function loadCompanyAppsAction (tree, id, token) {
  return loadCompanyApps(id, getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set(['companies', id, 'apps'], response.data)
      tree.commit()
      return response
    })
    .catch(pushResponseErrorToState(tree))
}

export function loadCompanyAppsActionServerAdaptor (req, res) {
  return loadCompanyAppsAction(res.locals.tree, req.params.company, req.authToken)
}

export function loadCompanyAppsActionRouterAdaptor (state, tree) {
  return loadCompanyAppsAction(tree, state.params.company)
}
