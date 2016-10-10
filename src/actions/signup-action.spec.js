import test from 'ava'
import mock from 'mock-require'
import Baobab from 'baobab'

test('passes user and request config to apis', t => {
  const expectedConfig = {XX: 123}
  const expectedTree = new Baobab()
  const expectedUser = {abc: 123}
  const expectedValue = 'secret'
  const expectedPromise = Promise.resolve(expectedValue)

  mock('../api/signup', {
    signup (user, config) {
      t.is(user, expectedUser)
      t.is(config, expectedConfig)
      return expectedPromise
    }
  })

  mock('tetris-iso/lib/functions/get-api-fetch-config', {
    getApiFetchConfig (tree) {
      t.is(tree, expectedTree)
      return expectedConfig
    }
  })

  const p = require('./signup-action').signupAction(expectedTree, expectedUser)

  return p.then(val => {
    t.is(val, expectedValue)
  })
})
