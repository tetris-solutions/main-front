import test from 'ava'
import buildDOM from '../test/helpers/dom'

const render = (...args) => require('../test/helpers/render').render(...args)

test('renders error if any', t => buildDOM().then(() => {
  const props = {
    activationError: new Error('Don\'t even care')
  }
  const {Activation} = require('./Activation')
  const {element, unmount} = render(Activation, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const errMsg = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-danger')

  t.ok(errMsg)
  t.not(-1, errMsg.innerHTML.indexOf(props.activationError.message))
  unmount()
}))

test('renders success message when no error is present', t => buildDOM().then(() => {
  const props = {}
  const {Activation} = require('./Activation')
  const {element, unmount} = render(Activation, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const successMsg = ReactTestUtils
    .findRenderedDOMComponentWithClass(element, 'text-success')

  t.ok(successMsg)
  unmount()
}))
