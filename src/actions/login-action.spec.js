import test from 'ava'
import mock from 'mock-require'
import Baobab from 'baobab'
import constant from 'lodash/constant'
import fetch from 'node-fetch'

const loginAction = (...args) => {
  delete require.cache['./login-action']
  return require('./login-action').default(...args)
}

const login = {__esModule: true}
const persistToken = {__esModule: true}
const reqConfig = {}

mock('../api/login', login)
mock('../functions/persist-token-as-cookie', persistToken)
mock('../functions/get-api-fetch-config', {
  __esModule: true,
  default: constant(reqConfig)
})

test('passes credentials to the APIs accordingly', t => {
  const tree = new Baobab()
  const email = 'abc@xxx.com'
  const password = '123'
  const response = new fetch.Response()

  response.data = {name: 'Obama'}

  login.default = (receivedEmail, receivedPassword, config) => {
    t.is(email, receivedEmail)
    t.is(password, receivedPassword)
    t.is(reqConfig, config)
    return Promise.resolve(response)
  }

  persistToken.default = receivedResponse => {
    t.is(response, receivedResponse)
    return receivedResponse
  }

  return loginAction(tree, email, password).then(() => {
    t.same(tree.get('user'), response.data)
  })
})
