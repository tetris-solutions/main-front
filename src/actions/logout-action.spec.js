import test from 'ava'
import window from 'global/window'
import logoutAction from './logout-action'
import Baobab from 'baobab'
import Cookies from 'js-cookie'
import {saveTokenAsCookie} from '../functions/save-token-as-cookie'

test('logout works', t => {
  window.document = {cookie: ''}
  saveTokenAsCookie('ABCDE')

  t.is('ABCDE', Cookies.get(process.env.TOKEN_COOKIE_NAME))

  const tree = new Baobab({
    user: {name: 'Obama'}
  })

  logoutAction(tree)

  t.notOk(tree.get('user'))
  t.notOk(Cookies.get(process.env.TOKEN_COOKIE_NAME))
})
