import {GET} from '@tetris/http'

/**
 * call load permissions API
 * @param {String} company company id
 * @param {Object} config fetch request config
 * @returns {Promise.<Array>} promise that resolves with requested permissions
 */
export function loadCompanyPermissions (company, config) {
  return GET(`${process.env.USER_API_URL}/company/${company}/permissions`, config)
}

export default loadCompanyPermissions
