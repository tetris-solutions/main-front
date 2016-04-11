import {POST} from '@tetris/http'
import assign from 'lodash/assign'

/**
 * sends a POST request to the create company plan API
 * @param {String} company company id
 * @param {String} plan plan id
 * @param {Object} config request config object
 * @returns {Promise.<Object>} returns a promise that resolves to a object containing the new company_plan id
 */
export function createCompanyPlan (company, plan, config) {
  return POST(`${process.env.USER_API_URL}/company_plan`, assign({body: {company, plan}}, config))
}

export default createCompanyPlan
