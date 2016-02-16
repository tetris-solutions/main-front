import test from 'ava'
import window from 'global/window'
import persistTokenAsCookie from '../functions/persist-token-as-cookie'
import fetch from 'node-fetch'

const {Response} = fetch

test('cookie is saved', t => {
  // document.cookie mock
  const doc = window.document = {cookie: ''}
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
