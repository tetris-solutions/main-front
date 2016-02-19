import test from 'ava'
import mock from 'mock-require'
import Baobab from 'baobab'
import constant from 'lodash/constant'
import fetch from 'node-fetch'

const loginAction = (...args) => {
  delete require.cache['./login-action']
  return require('./login-action').loginAction(...args)
}

const login = {}
const saveToken = {}
const reqConfig = {}

mock('../api/login', login)
mock('../functions/save-token-as-cookie', saveToken)
mock('../functions/get-api-fetch-config', {
  getApiFetchConfig: constant(reqConfig)
})

test('passes credentials to the APIs accordingly and saves user object on tree', t => {
  const tree = new Baobab()
  const email = 'abc@xxx.com'
  const password = '123'
  const response = new fetch.Response()

  response.data = {name: 'Obama'}

  login.login = (receivedEmail, receivedPassword, config) => {
    t.is(email, receivedEmail)
    t.is(password, receivedPassword)
    t.is(reqConfig, config)
    return Promise.resolve(response)
  }

  saveToken.saveResponseTokenAsCookie = receivedResponse => {
    t.is(response, receivedResponse)
    return receivedResponse
  }

  return loginAction(tree, email, password).then(() => {
    t.same(tree.get('user'), response.data)
  })
})
