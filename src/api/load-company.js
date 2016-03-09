import {GET} from '@tetris/http'

/**
 * call load company API
 * @param {String} id company id
 * @param {Object} config fetch request config
 * @returns {Promise.<Object>} promise that resolves with requested company
 */
export function loadCompany (id, config) {
  return GET(`${process.env.USER_API_URL}/company/${id}`, config)
}

export default loadCompany
