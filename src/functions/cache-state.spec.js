import test from 'ava'
import window from 'global/window'
import cacheState from './cache-state'

test('can persist a basic object to localStorage', t => {
  window.localStorage = {}
  const stateTree = {abc: true}
  cacheState(stateTree)
  t.same(JSON.parse(window.localStorage.tetrisState), stateTree)
})

test('does not persist state.errors to localStorage', t => {
  window.localStorage = {}
  const stateTree = {abc: true, errors: 'top secret'}
  cacheState(stateTree)
  const stored = JSON.parse(window.localStorage.tetrisState)
  t.notOk(stored.errors)
  t.notSame(stored, stateTree)
  delete stateTree.errors
  t.same(stored, stateTree)
})
