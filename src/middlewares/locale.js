import messages from '../messages'

export const DEFAULT_LOCALE = 'pt-BR'

/**
 * reads locale headers and save it to `req.locale`
 * @todo possibly read DEFAULT_LOCALE from domain country
 * @param {object} req express request
 * @param {object} res express response
 * @param {function} next next handler
 * @returns {undefined}
 */
export default (req, res, next) => {
  const cookieLocale = req.cookies[process.env.LOCALE_COOKIE_NAME]
  const headerLocale = req.acceptsLanguages(Object.keys(messages))
  const userLocale = req.user ? req.user.locale : null
  req.locale = cookieLocale || headerLocale || userLocale || DEFAULT_LOCALE
  next()
}
