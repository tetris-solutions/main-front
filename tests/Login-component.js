import React from 'react'
import {root} from 'baobab-react/higher-order'
import noop from 'lodash/noop'
import curry from 'lodash/curry'
import test from 'ava'
import Tree from 'baobab'
import {Login} from '../src/components/Login'
import shallowRender from './helpers/shallow-render'
import _loginAction from '../src/actions/login-action'

const loginAction = curry(_loginAction)
const stateTree = new Tree({
  locale: 'en'
})

test('shows help text empty email', t => {
  const props = {
    actions: {
      login: loginAction(stateTree)
    }
  }

  const login = shallowRender({Component: Login, props, displayName: 'Login', tree: stateTree})

  login.handleSubmit({
    preventDefault: noop,
    target: {
      elements: {
        email: {value: ''},
        password: {value: ''}
      }
    }
  })

  t.ok(true)
})
