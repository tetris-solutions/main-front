import {GET} from '@tetris/http'

/**
 * loads list of users in a given role
 * @param {String} role role id
 * @param {Object} config fetch config
 * @returns {Promise.<Array>} promise that resolves to a list users
 */
export function loadRoleUsers (role, config) {
  return GET(`${process.env.USER_API_URL}/role/${role}/users`, config)
}

export default loadRoleUsers
