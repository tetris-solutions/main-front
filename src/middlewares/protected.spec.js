import test from 'ava'
import protectedMiddleware from './protected'

test('writes 403 status for unauthenticated request and calls next', t =>
  protectedMiddleware(
    {},
    {
      status (code) {
        t.is(code, 403)
      }
    }, () => t.pass()))

test('does not mess with response when `req.user` is set', t =>
  protectedMiddleware({user: true}, null,
    () => t.pass()))
