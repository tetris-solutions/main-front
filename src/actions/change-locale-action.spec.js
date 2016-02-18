import test from 'ava'
import Baobab from 'baobab'
import changeLocaleAction from './change-locale-action'

const NEW_LOCALE = 'xy'

test('changes `state.locale`', t => {
  const tree = new Baobab()
  changeLocaleAction(tree, NEW_LOCALE)
  t.is(tree.get('locale'), NEW_LOCALE)
})

test('if user is logged in, changes `state.user.locale`', t => {
  const tree = new Baobab({user: {}})
  changeLocaleAction(tree, NEW_LOCALE)
  t.is(tree.get('user', 'locale'), NEW_LOCALE)
})
