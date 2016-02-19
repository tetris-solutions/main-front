import buildDOM from '../test/helpers/dom'
import test from 'ava'
import noop from 'lodash/noop'

const render = (...args) => require('../test/helpers/render').render(...args)

test('shows login and signup when no user is provided', t =>
  buildDOM().then(() => {
    const props = {
      user: null,
      actions: {logout: noop}
    }

    const {Header} = require('./Header')
    const {element, unmount} = render(Header, props)
    const {ul} = element.refs
    t.ok(ul)
    const lis = ul.children

    t.ok(lis[0].innerHTML.match(/signup/gi))
    t.ok(lis[1].innerHTML.match(/login/gi))

    unmount()
  }))

test('displays user name and logout link when a user is provided', t =>
  buildDOM().then(() => {
    const props = {
      user: {
        name: Math.random().toString(36).substr(2)
      },
      actions: {logout: noop}
    }

    const {Header} = require('./Header')
    const {element, unmount} = render(Header, props)
    const {ul} = element.refs
    t.ok(ul)
    const lis = ul.children

    t.ok(lis[0].innerHTML.match(new RegExp(props.user.name, 'gi')))
    t.ok(lis[1].innerHTML.match(/logout/gi))

    unmount()
  }))
