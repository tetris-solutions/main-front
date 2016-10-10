import {deleteCompanyPlan} from '../api/delete-company-plan'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

export function deleteCompanyPlanAction (tree, id) {
  return deleteCompanyPlan(id, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default deleteCompanyPlanAction
