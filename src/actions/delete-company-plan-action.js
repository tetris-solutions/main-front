import {deleteCompanyPlan} from '../api/delete-company-plan'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import {getApiFetchConfig} from '../functions/get-api-fetch-config'
import {pushResponseErrorToState} from '../functions/push-response-error-to-state'

export function deleteCompanyPlanAction (tree, id) {
  return deleteCompanyPlan(id, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default deleteCompanyPlanAction
