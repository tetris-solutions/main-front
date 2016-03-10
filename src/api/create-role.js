import {POST} from '@tetris/http'
import assign from 'lodash/assign'

/**
 * sends a POST request to the create role API
 * @param {String} company the company id
 * @param {String} name new role name
 * @param {Object} config request config object
 * @returns {Promise.<Object>} returns a promise that resolves to a object containing the new role id
 */
export function createRole (company, name, config) {
  return POST(`${process.env.USER_API_URL}/company/${company}/role`, assign({body: {name}}, config))
}

export default createRole
