import test from 'ava'
import initializeTreeMiddleware from './initialize-tree'
import defaultState from '../default-state'
import Baobab from 'baobab'

const res = {locals: {}}

test('initializes tree with default state', t =>
  initializeTreeMiddleware({}, res, () => {
    t.ok(res.locals.tree)
    t.true(res.locals.tree instanceof Baobab)
    t.same(res.locals.tree.get(), defaultState)
  }))
