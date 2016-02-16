import Cookies from 'js-cookie'
/**
 * reads token from fetch Response and stores it as a cookie
 * @param {Response} response fetch Response for a api call
 * @todo error handling
 * @returns {Response} the same response
 */
export function persistTokenAsCookie (response) {
  if (response.token) {
    try {
      Cookies.set(process.env.TOKEN_COOKIE_NAME, response.token, {
        domain: process.env.TOKEN_COOKIE_DOMAIN,
        expires: 1
      })
    } catch (e) {
      // ~ error handling ~
    }
  }
  return response
}

export default persistTokenAsCookie
