import test from 'ava'
import global from 'global'
import persistTokenAsCookie from '../functions/persist-token-as-cookie'
import fetch from 'node-fetch'

const {Response} = fetch

test('cookie is saved', t => {
  const doc = global.document = {cookie: ''}
  const response = new Response()
  response.token = 'ABCDEFG'
  persistTokenAsCookie(response)
  t.ok(doc.cookie)
  const indexOfTokenInCookie = doc.cookie.indexOf(
    `${process.env.TOKEN_COOKIE_NAME}=${response.token}`
  )
  t.not(indexOfTokenInCookie, -1)
  const indexOfDomainInCookie = doc.cookie.indexOf(
    process.env.TOKEN_COOKIE_DOMAIN
  )
  t.not(indexOfDomainInCookie, -1)
})
