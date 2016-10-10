import {updateCompany} from '../api/update-company'
import {saveResponseTokenAsCookie} from 'tetris-iso/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from 'tetris-iso/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from 'tetris-iso/lib/functions/push-response-error-to-state'
import findIndex from 'lodash/findIndex'

export function updateCompanyAction (tree, id, changes) {
  return updateCompany(id, changes, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      const index = findIndex(tree.get(['user', 'companies']), {id})

      tree.merge(['user', 'companies', index], changes)
      tree.merge(['companies', id], changes)
      tree.commit()

      return response
    })
    .catch(pushResponseErrorToState(tree))
}

export default updateCompanyAction
