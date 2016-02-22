import test from 'ava'
import messages from '../messages'
import {render, initialize} from '../test/helpers/render'

test.before(initialize)

test('renders `page-header`, `text-danger` and `btn-primary`', t => {
  const {ActivationFailure} = require('./ActivationFailure')
  const {element, unmount} = render(ActivationFailure)
  const ReactTestUtils = require('react-addons-test-utils')

  t.ok(element)
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'page-header'))
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-danger'))
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'btn-primary'))

  unmount()
})

test('renders passed message inside `text-danger` box', t => {
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
})

test('fallback to rendering default message inside `text-danger` box', t => {
  const {ActivationFailure} = require('./ActivationFailure')
  const {element, unmount} = render(ActivationFailure)
  const ReactTestUtils = require('react-addons-test-utils')
  const errMsg = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-danger')

  t.ok(errMsg)
  t.not(-1, errMsg.innerHTML.indexOf(messages.en.emailConfirmationFailureDefaultDescription))
  unmount()
})
