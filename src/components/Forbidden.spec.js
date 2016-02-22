import test from 'ava'
import buildDOM from '../test/helpers/dom'
import messages from '../messages'

const render = (...args) => require('../test/helpers/render').render(...args)

test('renders forbidden message and title inside alert box', t => buildDOM().then(() => {
  const {Forbidden} = require('./Forbidden')
  const {element, unmount} = render(Forbidden)
  const ReactTestUtils = require('react-addons-test-utils')

  const alertBox = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'alert-warning')

  t.ok(alertBox)
  t.not(-1, alertBox.innerHTML.indexOf(messages.en.accessForbiddenTitle))
  t.not(-1, alertBox.innerHTML.indexOf(messages.en.accessForbiddenDescription))

  unmount()
}))
