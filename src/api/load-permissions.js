import {GET} from '@tetris/http'

/**
 * call load permissions API
 * @param {Object} config fetch request config
 * @returns {Promise.<Array>} promise that resolves with requested permissions
 */
export function loadPermissions (config) {
  return GET(`${process.env.USER_API_URL}/permissions`, config)
}

export default loadPermissions
