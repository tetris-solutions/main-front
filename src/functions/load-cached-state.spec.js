import test from 'ava'
import window from 'global/window'
import loadCachedState from './load-cached-state'

test('can restore a saved state', t => {
  const tetrisState = JSON.stringify({
    abc: 123
  })
  window.localStorage = {tetrisState}

  t.same(loadCachedState(), JSON.parse(tetrisState))
})

test('returns an empty object when localStorage is empty', t => {
  delete window.localStorage
  t.ok(loadCachedState())
  t.same(loadCachedState(), {})
})

test('returns an empty object when localStorage contains an invalid value', t => {
  const invalidValues = [
    null,
    [1, 3, 3],
    0,
    'NOPE'
  ]

  function checkState (val) {
    window.localStorage = {tetrisState: JSON.stringify(val)}
    const loaded = loadCachedState()
    t.notSame(loaded, val)
    t.same(loaded, {})
  }

  invalidValues.forEach(checkState)
})
