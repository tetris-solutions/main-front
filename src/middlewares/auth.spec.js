import noop from 'lodash/noop'
import constant from 'lodash/constant'
import identity from 'lodash/identity'
import test from 'ava'
import mockHttp from 'node-mocks-http'
import fetch from 'node-fetch'
import Baobab from 'baobab'
import global from 'global'
import mock from 'mock-require'

const {Response} = fetch
const CORRECT_TOKEN = 'ABCDE'

const getUserTokenPath = '../api/get-user-by-token'
const getUserToken = {__esModule: true} // using this to fool babel's _interopRequireDefault
const passTokenAheadPath = '../functions/pass-token-ahead'
const passTokenAhead = {__esModule: true}

mock(getUserTokenPath, getUserToken)
mock(passTokenAheadPath, passTokenAhead)

const authMiddleware = (...args) => require('./auth').default(...args)

test('bypasses when no token is present on the request', t => {
  const req = mockHttp.createRequest()
  const res = mockHttp.createResponse()

  getUserToken.default = function () {
    t.fail('`getUserToken` should never be called when token is empty')
  }

  passTokenAhead.default = function () {
    t.fail('this should not happen')
  }

  function next () {
    t.pass()
  }

  return authMiddleware(req, res, next)
})

test('passes token from `Authorization` header to `getUserByToken` and eventually to `passTokenAhead`', t => {
  const req = mockHttp.createRequest({
    headers: {
      Authorization: `Bearer ${CORRECT_TOKEN}`
    }
  })
  const res = mockHttp.createResponse()

  res.locals = {tree: new Baobab()}

  const fetchRes = new Response()

  // replaces apis on the fly
  getUserToken.default = function (receivedToken) {
    t.is(receivedToken, CORRECT_TOKEN)
    return Promise.resolve(fetchRes)
  }
  passTokenAhead.default = constant(function (receivedFetchRes) {
    t.is(receivedFetchRes, fetchRes)
    return receivedFetchRes
  })

  function next () {
    t.pass()
  }

  return authMiddleware(req, res, next)
})

test('saves user returned by `getUserByToken` to `req.user` and `res.locals.tree.user`', t => {
  const req = mockHttp.createRequest({
    headers: {
      Authorization: `Bearer ${CORRECT_TOKEN}`
    }
  })
  const res = mockHttp.createResponse()

  res.locals = {tree: new Baobab()}

  const fetchRes = new Response()
  const user = fetchRes.data = {name: 'Trinity'}

  getUserToken.default = constant(Promise.resolve(fetchRes))
  passTokenAhead.default = constant(identity)

  return authMiddleware(req, res, noop)
    .then(() => {
      t.same(user, req.user)
      t.same(user, res.locals.tree.get('user'))
    })
})