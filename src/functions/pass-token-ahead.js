const ONE_DAY = 1000 * 60 * 60 * 24

/**
 * reads token from fetch request and forwards to client response
 * @param req
 * @param res
 * @returns {fetchCallback}
 */
export default function passTokenAhead (req, res) {
  const domain = process.env.TOKEN_COOKIE_DOMAIN
  const cookieName = process.env.TOKEN_COOKIE_NAME
  return function fetchCallback (fetchResponse) {
    if (fetchResponse.token) { // token was refreshed
      res.set('Authorization', `Bearer ${fetchResponse.token}`)
      res.cookie(cookieName, fetchResponse.token, {
        domain,
        expires: new Date(Date.now() + ONE_DAY)
      })
    }
    return fetchResponse
  }
}
