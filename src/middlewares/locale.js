import messages from '../messages'

export default (req, res, next) => {
  const cookieLocale = req.cookies[process.env.LOCALE_COOKIE_NAME]
  const headerLocale = req.acceptsLanguages(Object.keys(messages))
  const userLocale = req.user ? req.user.locale : null
  req.locale = cookieLocale || headerLocale || userLocale || 'en'
  next()
}
