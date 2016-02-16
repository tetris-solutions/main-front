import {GET} from '@tetris/http'

/**
 * load user from api
 * @param {string} token auth token
 * @returns {Promise} promise that resolves to a fetch response
 */
export default token => GET(`${process.env.USER_API_URL}`, {
  headers: {Authorization: `Bearer ${token}`}
})
