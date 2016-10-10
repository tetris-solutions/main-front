import {loadCompanyApps} from '../api/load-company-apps'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

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
