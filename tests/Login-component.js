import delay from 'delay'
import buildDOM from './helpers/dom'
import test from 'ava'

let ReactTestUtils
let Login
let cleanup
let render

test.before(t => buildDOM().then(() => {
  t.ok(document)

  ReactTestUtils = require('react-addons-test-utils')
  render = require('./helpers/render').default
  Login = require('../src/components/Login').Login
}))

test.afterEach(() => {
  if (cleanup) {
    cleanup()
    cleanup = null
  }
})

test('shows help text on empty password', t => {
  const {findRenderedDOMComponentWithTag, Simulate} = ReactTestUtils
  const props = {
    actions: {
      login (email, password) {
        return new Promise((_, reject) => {
          t.same(email, 'x@x.com')
          reject({fields: {password: 'ABC'}})
        })
      }
    }
  }

  t.ok(global.ReactIntl)

  const {component, kill} = render(Login, props)
  const form = findRenderedDOMComponentWithTag(component, 'form')

  t.ok(form)
  form.elements.email.value = 'x@x.com'
  Simulate.submit(form)
  cleanup = kill

  return delay(1000)
    .then(() => {
      const formGroup = form.elements.password.parentNode
      const className = formGroup.getAttribute('class')
      t.ok(className.match(/has-error/g))
    })
})
