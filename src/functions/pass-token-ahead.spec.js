import test from 'ava'
import passTokenAhead from './pass-token-ahead'
import expressMock from 'node-mocks-http'
import fetch from 'node-fetch'

const {Response} = fetch

test('token is forwarded to cookies', t => {
  const req = expressMock.createRequest()
  const res = expressMock.createResponse()
  const response = new Response()
  response.token = 'ABCDE'
  passTokenAhead(req, res)(response)

  t.is(res.get('Authorization'), `Bearer ${response.token}`)
  const cookie = res.cookies[process.env.TOKEN_COOKIE_NAME]
  t.ok(cookie)
  t.ok(cookie.options)
  delete cookie.options.expires
  t.same(cookie, {
    value: response.token,
    options: {
      domain: process.env.TOKEN_COOKIE_DOMAIN
    }
  })
})
