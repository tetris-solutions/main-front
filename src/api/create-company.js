import {POST} from '@tetris/http'
import assign from 'lodash/assign'

/**
 * sends a POST request to the create company API
 * @param {Object} company new company object
 * @param {Object} config request config object
 * @returns {Promise.<Object>} returns a promise that resolves to a object containing the new company id
 */
export function createCompany (company, config) {
  return POST(`${process.env.USER_API_URL}/company`, assign({body: company}, config))
}

export default createCompany
