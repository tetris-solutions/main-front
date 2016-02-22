import test from 'ava'
import noop from 'lodash/noop'
import {render, initialize} from '../test/helpers/render'
import each from 'lodash/each'
import delay from 'delay'

test.before(initialize)

test('renders all attribute inputs', t => {
  const props = {user: {name: 'Obama', email: 'xx@xxx.com'}, actions: {updateMe: noop}}
  const {Me} = require('./Me')
  const {element, unmount} = render(Me, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const form = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'form')

  t.ok(form.elements.name)
  t.is(props.user.name, form.elements.name.value)
  t.ok(form.elements.email)
  t.is(props.user.email, form.elements.email.value)
  t.ok(form.elements.oldPassword)
  t.ok(form.elements.password)
  t.ok(form.elements.submitButton)

  unmount()
})

test('renders avatar in img', t => {
  const props = {user: {avatar: 'http://placehold.it/480x480'}, actions: {updateMe: noop}}
  const {Me} = require('./Me')
  const {element, unmount} = render(Me, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const img = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'img')

  t.is(props.user.avatar, img.src)

  unmount()
})

test('`handleSubmit` calls `updateMe` action passing form values', t => {
  const expectedUser = {
    name: 'Obama',
    email: 'obama@whitehouse.gov',
    password: '123456',
    oldPassword: '654321'
  }
  const props = {
    user: {}, actions: {
      updateMe ({name, email, password, oldPassword}) {
        t.is(name, expectedUser.name)
        t.is(email, expectedUser.email)
        t.is(password, expectedUser.password)
        t.is(oldPassword, expectedUser.oldPassword)
        return Promise.resolve()
      }
    }
  }
  const {Me} = require('./Me')
  const {element, unmount} = render(Me, props)

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

