import test from 'ava'
import window from 'global/window'
import {saveResponseTokenAsCookie} from './save-token-as-cookie'
import fetch from 'node-fetch'
import Cookies from 'js-cookie'

const {Response} = fetch

test('cookie is saved', t => {
  // document.cookie mock
  const doc = window.document = {cookie: ''}
  const response = new Response()
  response.token = 'ABCDEFG'
  saveResponseTokenAsCookie(response)
  t.ok(doc.cookie)
  const cookie = Cookies.get(process.env.TOKEN_COOKIE_NAME)
  t.ok(cookie)
})
