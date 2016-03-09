import test from 'ava'
import mock from 'mock-require'
import fetch from 'node-fetch'
import Baobab from 'baobab'
import assign from 'lodash/assign'

test('passes `tree` through `getApiFetchConfig` and uses this config to call api `updateMe`, saving the updated user returned from server in the tree', t => {
  const expectedConfig = {XX: 123}
  const oldUser = {name: 'Obama'}
  const expectedTree = new Baobab({user: oldUser})
  const changedUser = {name: 'Not Obama'}
  const expectedPromise = Promise.resolve()
  const expectedResponse = new fetch.Response()

  const userReturnedFromServer = expectedResponse.data = assign({changeDate: new Date()}, changedUser)

  mock('../api/update-me', (user, config) => {
    t.is(user, changedUser)
    t.is(config, expectedConfig)
    return expectedPromise
  })

  mock('../functions/get-api-fetch-config', {
    getApiFetchConfig (tree) {
      t.is(tree, expectedTree)
      return expectedConfig
    }
  })

  mock('../functions/save-token-as-cookie', {
    saveTokenAsCookie (response) {
      t.is(response, expectedResponse)
      return expectedResponse
    }
  })

  mock('../api/update-me', {
    updateMe (user, config) {
      t.is(user, changedUser)
      t.is(config, expectedConfig)
      return Promise.resolve(expectedResponse)
    }
  })

  const {updateMeAction} = require('./update-me-action')

  return updateMeAction(expectedTree, changedUser)
    .then(() => {
      const newUser = expectedTree.get('user')
      t.ok(newUser)
      t.not(oldUser, newUser) // user should have been changed
      t.is(newUser.name, changedUser.name)
      t.same(newUser, userReturnedFromServer)
    })
})
