import buildDOM from '../test/helpers/dom'
import test from 'ava'
import noop from 'lodash/noop'
import delay from 'delay'

const render = (...args) => require('../test/helpers/render').render(...args)

test('form has all the inputs and submit button', t =>
  buildDOM().then(() => {
    const props = {
      actions: {
        login: noop
      }
    }
    const {Login} = require('./Login')
    const ReactTestUtils = require('react-addons-test-utils')
    const {element, unmount} = render(Login, props)

    const form = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'form')
    t.ok(form)

    t.ok(form.elements.email)
    t.ok(form.elements.password)
    t.ok(form.elements.submitButton)

    unmount()
  }))

test('show help text on empty password', t =>
  buildDOM().then(() => {
    const props = {
      actions: {
        login (email, password) {
          return new Promise((_, reject) => {
            t.is(email, 'x@x.com')
            reject({fields: {password: 'ABC'}})
          })
        }
      }
    }
    const {Login} = require('./Login')
    const ReactTestUtils = require('react-addons-test-utils')
    const {element, unmount} = render(Login, props)
    const form = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'form')

    t.ok(form)
    form.elements.email.value = 'x@x.com'
    ReactTestUtils.Simulate.submit(form)

    return delay(1000)
      .then(() => {
        const formGroup = form.elements.password.parentNode
        const className = formGroup.getAttribute('class')
        t.ok(className.match(/has-error/g))
      }).then(unmount)
  }))

test('show help text on empty email', t =>
  buildDOM().then(() => {
    const props = {
      actions: {
        login (email, password) {
          return new Promise((_, reject) => {
            t.is(password, '123456')
            reject({fields: {email: 'ABC'}})
          })
        }
      }
    }
    const {Login} = require('./Login')
    const ReactTestUtils = require('react-addons-test-utils')
    const {element, unmount} = render(Login, props)
    const form = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'form')

    t.ok(form)
    form.elements.password.value = '123456'
    ReactTestUtils.Simulate.submit(form)

    return delay(1000)
      .then(() => {
        const formGroup = form.elements.email.parentNode
        const className = formGroup.getAttribute('class')
        t.ok(className.match(/has-error/g))
      }).then(unmount)
  }))
