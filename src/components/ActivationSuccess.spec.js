import test from 'ava'
import messages from '../messages'
import {render, initialize} from '../test/helpers/render'

test.before(initialize)

test('renders `page-header`, `text-success` and `btn-primary`', t => {
  const {ActivationSuccess} = require('./ActivationSuccess')
  const {element, unmount} = render(ActivationSuccess)
  const ReactTestUtils = require('react-addons-test-utils')

  t.ok(element)
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'page-header'))
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-success'))
  t.ok(ReactTestUtils.findRenderedDOMComponentWithClass(element, 'btn-primary'))

  unmount()
})

test('renders confirmationSuccess message', t => {
  const {ActivationSuccess} = require('./ActivationSuccess')
  const {element, unmount} = render(ActivationSuccess)
  const ReactTestUtils = require('react-addons-test-utils')
  const successMsg = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'text-success')

  t.ok(successMsg)
  t.not(-1, successMsg.innerHTML.indexOf(messages.en.emailConfirmationSuccess))
  unmount()
})
