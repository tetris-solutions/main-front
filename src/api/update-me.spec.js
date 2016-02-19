import test from 'ava'
import mock from 'mock-require'
import delay from 'delay'
import constant from 'lodash/constant'

const updateMe = (...args) => {
  delete require.cache['./update-me']
  return require('./update-me').updateMe(...args)
}

const validateUser = {__esModule: true}
const http = {}

mock('@tetris/http', http)
mock('../functions/validate-user', validateUser)

test('passes user through validation setting `requiresPassword` to false', t => {
  const passedUser = {}
  const ultraSecret = 123

  http.PUT = constant(Promise.resolve(ultraSecret))

  validateUser.validateUser = (receivedUser, requiresPassword) => {
    t.is(requiresPassword, false)
    t.is(passedUser, receivedUser)
    return Promise.resolve()
  }

  return updateMe(passedUser)
    .then(magicValue => t.is(magicValue, ultraSecret))
})

test('fires a PUT request to the update user api passing user in the body', t => delay(100).then(() => {
  validateUser.validateUser = constant(Promise.resolve())
  const passedUser = {}
  const passedConfig = {XXX: 123}
  http.PUT = (url, receivedConfig) => {
    t.is(url, `${process.env.USER_API_URL}/me`)
    t.not(passedConfig, receivedConfig, 'should create a fresh object')
    t.ok(receivedConfig)
    t.same(receivedConfig.body, passedUser)
    t.is(receivedConfig.XXX, passedConfig.XXX)
  }
  return updateMe(passedUser, passedConfig)
}))
