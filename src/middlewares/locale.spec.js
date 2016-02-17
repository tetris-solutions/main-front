import test from 'ava'
import constant from 'lodash/constant'
import localeMiddleware, {DEFAULT_LOCALE} from './locale'

test('cookie locale takes precedence', t => {
  const req = {
    cookies: {
      [process.env.LOCALE_COOKIE_NAME]: 'ZZ'
    },
    acceptsLanguages: constant('XY'),
    user: {
      locale: 'AB'
    }
  }
  localeMiddleware(req, null, () => {
    t.is(req.locale, req.cookies[process.env.LOCALE_COOKIE_NAME])
  })
})

test('if cookie is not present, reads from `Accept-Language` header', t => {
  const req = {
    cookies: {},
    acceptsLanguages: constant('XY'),
    user: {
      locale: 'AB'
    }
  }
  localeMiddleware(req, null, () => {
    t.is(req.locale, req.acceptsLanguages())
  })
})

test('if cookie and `Accept-Language` are not present, reads from user profile', t => {
  const req = {
    cookies: {},
    acceptsLanguages: constant(null),
    user: {
      locale: 'AB'
    }
  }
  localeMiddleware(req, null, () => {
    t.is(req.locale, req.user.locale)
  })
})

test('when all else fails, fallback to default', t => {
  const req = {
    cookies: {},
    acceptsLanguages: constant(null),
    user: null
  }
  localeMiddleware(req, null, () => {
    t.is(req.locale, DEFAULT_LOCALE)
  })
})
