import {loadCompanyAccounts} from '../api/load-company-accounts'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

export function loadCompanyAccountsAction (tree, id, token) {
  return loadCompanyAccounts(id, getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set(['companies', id, 'accounts'], response.data)
      tree.commit()
      return response
    })
    .catch(pushResponseErrorToState(tree))
}

export function loadCompanyAccountsActionServerAdaptor (req, res) {
  return loadCompanyAccountsAction(res.locals.tree, req.params.company, req.authToken)
}

export function loadCompanyAccountsActionRouterAdaptor (state, tree) {
  return loadCompanyAccountsAction(tree, state.params.company)
}
