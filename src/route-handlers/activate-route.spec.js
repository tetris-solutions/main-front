import test from 'ava'
import mock from 'mock-require'
import mockHttp from 'node-mocks-http'
import delay from 'delay'
import constant from 'lodash/constant'
import identity from 'lodash/identity'
import fetch from 'node-fetch'
import Baobab from 'baobab'
import noop from 'lodash/noop'

const {Response} = fetch
const modules = {}
const activateRoute = (...args) => require('./activate-route').activateRoute(...args)
const activationCode = 'ABCDE'

mock('@tetris/http', modules)
mock('../api/get-user-by-token', modules)
mock('../functions/server-render-route', modules)
mock('../functions/pass-token-ahead', modules)

test('fires a GET request to the activate user api passing `req.locale` and `req.params.activationCode`', t => {
  const req = mockHttp.createRequest({
    params: {activationCode}
  })
  const res = mockHttp.createResponse()

  res.locals = {tree: new Baobab()}
  req.locale = 'XY'

  modules.GET = (url, config) => {
    t.ok(config)
    t.ok(config.headers)
    t.is(config.headers['Accept-Language'], req.locale)
    t.is(url, `${process.env.USER_API_URL}/activate/${activationCode}`)

    return Promise.reject(new Response())
  }
  modules.serverRenderRoute = noop
  modules.passTokenAhead = constant(identity)
  modules.getUserByToken = constant(Promise.resolve(new Response()))

  return activateRoute(req, res)
})

test('pipes activate user response into `passTokenAhead`', t => delay(10).then(() => {
  const req = mockHttp.createRequest()
  const res = mockHttp.createResponse()

  res.locals = {tree: new Baobab()}

  const activationResponse = new Response()

  modules.GET = () => Promise.resolve(activationResponse)
  modules.passTokenAhead = (_req, _res) => {
    t.is(req, _req)
    t.is(res, _res)
    return response => {
      t.is(response, activationResponse)
      return response
    }
  }
  modules.serverRenderRoute = noop
  modules.getUserByToken = constant(Promise.resolve(new Response()))

  return activateRoute(req, res)
}))

test('passes token from the api response to `getUserByToken`', t => delay(20).then(() => {
  const req = mockHttp.createRequest()
  const res = mockHttp.createResponse()

  res.locals = {tree: new Baobab()}

  const activationResponse = new Response()

  activationResponse.token = 'XYZ'

  modules.GET = () => Promise.resolve(activationResponse)
  modules.passTokenAhead = constant(identity)
  modules.serverRenderRoute = noop
  modules.getUserByToken = token => {
    t.is(token, activationResponse.token)
  }

  return activateRoute(req, res)
}))

test('saves user object returned by `getUserByToken` to the state tree', t => delay(30).then(() => {
  const req = mockHttp.createRequest()
  const res = mockHttp.createResponse()

  res.locals = {tree: new Baobab()}

  modules.GET = () => Promise.resolve(new Response())
  modules.passTokenAhead = constant(identity)
  modules.serverRenderRoute = noop

  const response = new Response()
  response.data = {name: 'Obama'}

  modules.getUserByToken = constant(response)

  return activateRoute(req, res)
    .then(() => {
      const {tree} = res.locals
      t.same(tree.get('user'), response.data)
    })
}))

test('in case of failure on the activate user request, saves `response.data` in the state tree and set the same response status code', t => delay(40).then(() => {
  const req = mockHttp.createRequest()
  const res = mockHttp.createResponse()

  res.locals = {tree: new Baobab()}

  const response = new Response()

  response.status = 420
  response.data = {nope: true}

  modules.GET = constant(Promise.reject(response))
  modules.passTokenAhead = constant(() => {
    t.fail('this should never happen')
  })
  modules.serverRenderRoute = noop
  modules.getUserByToken = () => {
    t.fail('this should never happen')
  }

  return activateRoute(req, res)
    .then(() => {
      const {tree} = res.locals
      t.notOk(tree.get('user'))
      t.same(tree.get('errors', 'activation'), response.data)
      t.is(res.statusCode, response.status)
    })
}))

test('in case of failure on `getUserByToken`, saves `response.data` in the state tree and set the same response status code', t => delay(50).then(() => {
  const req = mockHttp.createRequest()
  const res = mockHttp.createResponse()

  res.locals = {tree: new Baobab()}

  modules.GET = constant(Promise.resolve(new Response()))
  modules.passTokenAhead = constant(identity)
  modules.serverRenderRoute = noop

  const response = new Response()

  response.status = 418
  response.data = {nope: true}

  modules.getUserByToken = constant(Promise.reject(response))

  return activateRoute(req, res)
    .then(() => {
      const {tree} = res.locals
      t.notOk(tree.get('user'))
      t.same(tree.get('errors', 'activation'), response.data)
      t.is(res.statusCode, response.status)
    })
}))
