import test from 'ava'
import buildDOM from '../test/helpers/dom'
import messages from '../messages'

const render = (...args) => require('../test/helpers/render').render(...args)

test('renders `page-header`, `text-success` and `btn-primary`', t => buildDOM().then(() => {
  const {ActivationSuccess} = require('./ActivationSuccess')
  const {element, unmount} = render(ActivationSuccess)
  const ReactTestUtils = require('react-addons-test-utils')

  t.ok(element)
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'page-header'))
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-success'))
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'btn-primary'))

  unmount()
}))

test('renders confirmationSuccess message', t => buildDOM().then(() => {
  const {ActivationSuccess} = require('./ActivationSuccess')
  const {element, unmount} = render(ActivationSuccess)
  const ReactTestUtils = require('react-addons-test-utils')
  const successMsg = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-success')

  t.ok(successMsg)
  t.not(-1, successMsg.innerHTML.indexOf(messages.en.emailConfirmationSuccess))
  unmount()
}))
