/* eslint-disable */
import _intl from '@tetris/base-lib/intl'
/* eslint-enable */
import test from 'ava'
import cheerio from 'cheerio'
import serverRenderRoute from './server-render-route'
import mockHttp from 'node-mocks-http'
import Baobab from 'baobab'
import messages from '../messages'
import global from 'global'

const LOCALE = 'pt-BR'

test('injects state tree as a script tag', t => {
  const req = mockHttp.createRequest({
    method: 'GET',
    url: '/login'
  })

  req.locale = LOCALE

  const res = mockHttp.createResponse()
  const expectedUser = {name: 'Obama'}
  const tree = new Baobab({user: expectedUser})

  res.locals = {tree}

  serverRenderRoute(req, res)

  const $ = cheerio.load(res._getData())
  const stateInjectionScript = $('#state-injection')

  t.ok(stateInjectionScript.length)
  t.true(stateInjectionScript.is('script'))

  let scriptContent = stateInjectionScript.first().html()

  t.is(0, scriptContent.trim().indexOf('var backendPayload = {'))

  scriptContent = scriptContent.replace('var backendPayload', 'global.backendPayload')

  /* eslint-disable */
  eval(scriptContent)
  /* eslint-enable */

  t.ok(global.backendPayload)

  const {locale, user, intl} = global.backendPayload

  t.is(locale, LOCALE)
  t.same(user, expectedUser)
  t.ok(intl)
  t.is(intl.locales, LOCALE)
  t.same(intl.messages, messages[LOCALE])
})
