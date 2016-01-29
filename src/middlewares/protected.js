export default function protectedRouteMiddleware (req, res, next) {
  if (!req.user) {
    res.status(403)
    next()
  } else {
    next()
  }
}
