import {deleteCompanyAccount} from '../api/delete-company-account'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

export function deleteCompanyAccountAction (tree, id) {
  return deleteCompanyAccount(id, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default deleteCompanyAccountAction
