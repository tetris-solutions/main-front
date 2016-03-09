import test from 'ava'
import {getApiFetchConfig} from './get-api-fetch-config'
import Baobab from 'baobab'
import Cookies from 'js-cookie'
import window from 'global/window'

test('defaults to "en" locale and empty Authorization', t => {
  const tree = new Baobab()

  window.document = {cookie: ''}

  const config = getApiFetchConfig(tree)
  t.notOk(config.headers.Authorization)
  t.is(config.headers['Accept-Language'], 'en')
})

test('loads locale from state.locale', t => {
  const tree = new Baobab({
    locale: 'xy'
  })
  window.document = {cookie: ''}

  const config = getApiFetchConfig(tree)

  t.ok(config.headers['Accept-Language'])
  t.is(config.headers['Accept-Language'], 'xy')
})

test('loads token from cookie', t => {
  window.document = {cookie: ''}
  const token = 'ABCDE'
  Cookies.set(process.env.TOKEN_COOKIE_NAME, token, {
    domain: process.env.TOKEN_COOKIE_DOMAIN,
    expires: 1
  })

  const tree = new Baobab()

  const config = getApiFetchConfig(tree)

  t.ok(config.headers.Authorization)
  t.is(config.headers.Authorization, `Bearer ${token}`)
})
