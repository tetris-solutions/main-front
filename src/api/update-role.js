import {PUT} from '@tetris/http'
import assign from 'lodash/assign'

/**
 * fires a PUT request to the update role API
 * @param {String} id role id
 * @param {String} name new role name
 * @param {Array.<String>} permissions update list of permissions
 * @param {Object} config request config
 * @returns {Promise} a promise that resolves once API call is complete
 */
export function updateRole (id, name, permissions, config) {
  return PUT(`${process.env.USER_API_URL}/role/${id}`, assign({
    body: {
      name,
      permissions
    }
  }, config))
}

export default updateRole
