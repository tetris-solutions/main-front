import {deleteCompanyPlan} from '../api/delete-company-plan'
import {saveResponseTokenAsCookie} from 'tetris-iso/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from 'tetris-iso/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from 'tetris-iso/lib/functions/push-response-error-to-state'

export function deleteCompanyPlanAction (tree, id) {
  return deleteCompanyPlan(id, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default deleteCompanyPlanAction
