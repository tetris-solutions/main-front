/**
 * sets a status code of 403 when the request is not authenticated, but delegates the response body itself to the next handler
 * @param {object} req express request
 * @param {object} res express response
 * @param {function} next next handler
 * @returns {undefined}
 */
export default function protectedRouteMiddleware (req, res, next) {
  if (!req.user) {
    res.status(403)
    next()
  } else {
    next()
  }
}
