import test from 'ava'
import mock from 'mock-require'
import delay from 'delay'
import constant from 'lodash/constant'

const signup = (...args) => {
  delete require.cache['./signup']
  return require('./signup').default(...args)
}

const validateUser = {__esModule: true}
const http = {}

mock('@tetris/http', http)
mock('../functions/validate-user', validateUser)

test('passes user through validation', t => {
  const passedUser = {}
  const ultraSecret = 123

  http.POST = constant(Promise.resolve(ultraSecret))

  validateUser.default = receivedUser => {
    t.is(passedUser, receivedUser)
    return Promise.resolve()
  }

  return signup(passedUser)
    .then(magicValue => t.is(magicValue, ultraSecret))
})

test('fires a POST request to the signup user api passing user in the body', t => delay(100).then(() => {
  validateUser.default = constant(Promise.resolve())
  const passedUser = {}
  const passedConfig = {XXX: 123}
  http.POST = (url, receivedConfig) => {
    t.is(url, `${process.env.USER_API_URL}/user`)
    t.not(passedConfig, receivedConfig, 'should create a fresh object')
    t.ok(receivedConfig)
    t.same(receivedConfig.body, passedUser)
    t.is(receivedConfig.XXX, passedConfig.XXX)
  }
  return signup(passedUser, passedConfig)
}))
