import {loadCompanyAccounts} from '../api/load-company-accounts'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'
import {pushResponseErrorToState} from '../functions/push-response-error-to-state'

export function loadCompanyAccountsAction (tree, id, token) {
  return loadCompanyAccounts(id, getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set(['companies', id, 'accounts'], response.data)
      tree.commit()
    })
    .catch(pushResponseErrorToState(tree))
}

export function loadCompanyAccountsActionServerAdaptor (req, res) {
  return loadCompanyAccountsAction(res.locals.tree, req.params.company, req.authToken)
}

export function loadCompanyAccountsActionRouterAdaptor (state, tree) {
  return loadCompanyAccountsAction(tree, state.params.company)
}
