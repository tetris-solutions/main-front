import test from 'ava'
import noop from 'lodash/noop'
import {render, initialize} from '../test/helpers/render'
import each from 'lodash/each'
import delay from 'delay'

test.before(initialize)

test('renders all attribute inputs', t => {
  const props = {actions: {signup: noop}}
  const {Signup} = require('./Signup')
  const {element, unmount} = render(Signup, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const form = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'form')

  t.ok(form.elements.name)
  t.ok(form.elements.email)
  t.ok(form.elements.password)
  t.ok(form.elements.submitButton)

  unmount()
})

test('`handleSubmit` calls `signup` action passing form values', t => {
  const expectedUser = {
    name: 'Obama',
    email: 'obama@whitehouse.gov',
    password: '123456'
  }
  const props = {
    user: {}, actions: {
      signup ({name, email, password}) {
        t.is(name, expectedUser.name)
        t.is(email, expectedUser.email)
        t.is(password, expectedUser.password)
        return Promise.resolve()
      }
    }
  }
  const {Signup} = require('./Signup')
  const {element, unmount} = render(Signup, props)

  element.handleSubmitException = noop

  const ReactTestUtils = require('react-addons-test-utils')
  const form = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'form')

  each(expectedUser, (value, key) => {
    const input = form.elements[key]
    input.value = value
  })

  ReactTestUtils.Simulate.submit(form)

  return delay(100).then(unmount)
})

