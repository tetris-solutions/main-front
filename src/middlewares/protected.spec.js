import test from 'ava'
import protectedMiddleware from './protected'

test('redirects to login setting next query param', t =>
  protectedMiddleware(
    {
      path: '/xxx'
    },
    {
      redirect (newPath) {
        t.is(newPath, `/login?next=/xxx`)
      }
    }))

test('does not mess with response when `req.user` is set', t =>
  protectedMiddleware({user: true}, null,
    () => t.pass()))
