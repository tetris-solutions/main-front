import loadUser from '../api/load-user'
import passTokenAhead from '../functions/pass-token-ahead'

export default function authMiddleware (req, res, next) {
  const domain = process.env.TOKEN_COOKIE_DOMAIN
  const cookieName = process.env.TOKEN_COOKIE_NAME
  const token = (req.get('Authorization') || '').replace(/^Bearer\s/, '') || req.cookies[cookieName]

  function noAuth () {
    if (req.cookies[cookieName]) res.clearCookie(cookieName, {domain})
    next()
    return true
  }

  if (!token) return noAuth()

  loadUser(token)
    .then(passTokenAhead(req, res))
    .then(function saveUserObject (response) {
      res.locals.tree.set('user', response.data)
      res.locals.tree.commit()
      next()
    }, noAuth)
}
