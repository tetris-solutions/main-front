import test from 'ava'
import buildDOM from '../test/helpers/dom'
import messages from '../messages'

const render = (...args) => require('../test/helpers/render').render(...args)

test('renders `page-header`, `text-danger` and `btn-primary`', t => buildDOM().then(() => {
  const props = {}
  const {ActivationFailure} = require('./ActivationFailure')
  const {element, unmount} = render(ActivationFailure, props)
  const ReactTestUtils = require('react-addons-test-utils')

  t.ok(element)
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'page-header'))
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-danger'))
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'btn-primary'))

  unmount()
}))

test('renders passed message inside `text-danger` box', t => buildDOM().then(() => {
  const props = {
    children: 'Nonsense'
  }
  const {ActivationFailure} = require('./ActivationFailure')
  const {element, unmount} = render(ActivationFailure, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const errMsg = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-danger')

  t.ok(errMsg)
  t.not(-1, errMsg.innerHTML.indexOf(props.children))
  unmount()
}))

test('fallback to rendering default message inside `text-danger` box', t => buildDOM().then(() => {
  const props = {}
  const {ActivationFailure} = require('./ActivationFailure')
  const {element, unmount} = render(ActivationFailure, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const errMsg = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-danger')

  t.ok(errMsg)
  t.not(-1, errMsg.innerHTML.indexOf(messages.en.emailConfirmationFailureDefaultDescription))
  unmount()
}))
