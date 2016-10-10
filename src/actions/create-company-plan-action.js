import {createCompanyPlan} from '../api/create-company-plan'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

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
