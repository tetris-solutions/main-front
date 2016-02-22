import test from 'ava'
import {render, initialize} from '../test/helpers/render'

test.before(initialize)

test('renders error if any', t => {
  const props = {
    activationError: new Error('Don\'t even care')
  }
  initialize()
  const {Activation} = require('./Activation')
  const {element, unmount} = render(Activation, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const errMsg = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-danger')

  t.ok(errMsg)
  t.not(-1, errMsg.innerHTML.indexOf(props.activationError.message))
  unmount()
})

test('renders success message when no error is present', t => {
  const {Activation} = require('./Activation')
  const {element, unmount} = render(Activation)
  const ReactTestUtils = require('react-addons-test-utils')
  const successMsg = ReactTestUtils
    .findRenderedDOMComponentWithClass(element, 'text-success')

  t.ok(successMsg)
  unmount()
})
