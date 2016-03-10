import {POST} from '@tetris/http'
import assign from 'lodash/assign'

/**
 * sends a POST request to the create company API
 * @param {String} name new company name
 * @param {Object} config request config object
 * @returns {Promise.<Object>} returns a promise that resolves to a object containing the new company id
 */
export function createCompany (name, config) {
  return POST(`${process.env.USER_API_URL}/company`, assign({body: {name}}, config))
}

export default createCompany
