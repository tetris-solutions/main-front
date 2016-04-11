import {createCompanyPlan} from '../api/create-company-plan'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import {getApiFetchConfig} from '../functions/get-api-fetch-config'
import {pushResponseErrorToState} from '../functions/push-response-error-to-state'

/**
 * creates a new company plan
 * @param {Baobab} tree state tree
 * @param {String} company company id
 * @param {String} plan plan id
 * @returns {Promise} resolves once the company is loaded
 */
export function createCompanyPlanAction (tree, company, plan) {
  return createCompanyPlan(company, plan, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default createCompanyPlanAction
