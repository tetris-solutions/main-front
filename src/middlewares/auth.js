import {getUserByToken} from '../api/get-user-by-token'
import {passTokenAhead} from '../functions/pass-token-ahead'

/**
 * express middleware that reads token from Authorization header and cookies, setting req.user
 * @param {Object} req express request
 * @param {Object} res express response
 * @param {Function} next next handler
 * @returns {Promise} promise that resolves once work is done
 */
export function authMiddleware (req, res, next) {
  const domain = process.env.TOKEN_COOKIE_DOMAIN
  const cookieName = process.env.TOKEN_COOKIE_NAME
  const token = (req.get('Authorization') || '').replace(/^Bearer\s/, '') || req.cookies[cookieName]

  function noAuth () {
    if (req.cookies[cookieName]) res.clearCookie(cookieName, {domain})
    next()
    return Promise.resolve()
  }

  if (!token) return noAuth()

  return getUserByToken(token)
    .then(passTokenAhead(req, res))
    .then(function saveUserObject (response) {
      req.authToken = token
      req.user = response.data
      if (req.locale) {
        req.user.locale = req.locale
      }
      res.locals.tree.set('user', response.data)
      res.locals.tree.commit()
      next()
    }, noAuth)
}

export default authMiddleware
