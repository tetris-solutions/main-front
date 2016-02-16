import test from 'ava'
import window from 'global/window'
import persistTree from './persist-tree'

test('can persist a basic object to localStorage', t => {
  window.localStorage = {}
  const stateTree = {abc: true}
  persistTree(stateTree)
  t.same(JSON.parse(window.localStorage.tetrisState), stateTree)
})

test('does not persist state.errors to localStorage', t => {
  window.localStorage = {}
  const stateTree = {abc: true, errors: 'top secret'}
  persistTree(stateTree)
  const stored = JSON.parse(window.localStorage.tetrisState)
  t.notOk(stored.errors)
  t.notSame(stored, stateTree)
  delete stateTree.errors
  t.same(stored, stateTree)
})
