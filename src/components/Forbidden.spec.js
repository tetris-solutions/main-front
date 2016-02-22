import test from 'ava'
import messages from '../messages'
import {render, initialize} from '../test/helpers/render'

test.before(initialize)

test('renders forbidden message and title inside alert box', t => {
  const {Forbidden} = require('./Forbidden')
  const {element, unmount} = render(Forbidden)
  const ReactTestUtils = require('react-addons-test-utils')

  const alertBox = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'alert-warning')

  t.ok(alertBox)
  t.not(-1, alertBox.innerHTML.indexOf(messages.en.accessForbiddenTitle))
  t.not(-1, alertBox.innerHTML.indexOf(messages.en.accessForbiddenDescription))

  unmount()
})
