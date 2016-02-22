import test from 'ava'
import {render, initialize} from '../test/helpers/render'
import messages from '../messages'

test.before(initialize)

test('renders greeting message', t => {
  const {Home} = require('./Home')
  const {element, unmount} = render(Home)
  const ReactTestUtils = require('react-addons-test-utils')
  const h1 = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'h1')

  t.not(-1, h1.innerHTML.indexOf(messages.en.greetingMessage))
  unmount()
})
