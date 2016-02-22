import test from 'ava'
import {render, initialize} from '../test/helpers/render'
import messages from '../messages'
import trim from 'lodash/trim'

test.before(initialize)

test('renders label with given name', t => {
  const props = {
    name: 'name',
    label: 'name'
  }
  const {SimpleInput} = require('./SimpleInput')
  const {element, unmount} = render(SimpleInput, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const label = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'label')

  t.is(trim(label.textContent), messages.en.nameLabel)

  unmount()
})

test('renders error if any', t => {
  const props = {
    name: 'name',
    label: 'name',
    error: 'You dun goofed'
  }
  const {SimpleInput} = require('./SimpleInput')
  const {element, unmount} = render(SimpleInput, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const helpBlock = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'help-block')

  t.is(trim(helpBlock.textContent), props.error)
  const formGroup = helpBlock.parentNode
  t.ok(formGroup.getAttribute('class').match(/has-error/g))

  unmount()
})

test('attaches `onChange` when passed', t => {
  const expectedValue = 'nicolas cage'
  const props = {
    name: 'name',
    label: 'name',
    onChange ({target: {value}}) {
      t.is(value, expectedValue)
    }
  }
  const {SimpleInput} = require('./SimpleInput')
  const {element, unmount} = render(SimpleInput, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const input = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'input')

  input.value = expectedValue
  ReactTestUtils.Simulate.change(input)

  unmount()
})

test('type fallback to text', t => {
  const props = {
    name: 'name',
    label: 'name'
  }
  const {SimpleInput} = require('./SimpleInput')
  const {element, unmount} = render(SimpleInput, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const input = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'input')

  t.is('text', input.getAttribute('type'))

  unmount()
})

test('sets type, required, defaultValue from props', t => {
  const props = {
    name: 'name',
    label: 'name',
    type: 'email',
    required: true,
    defaultValue: 'james-bond@yahoo.com'
  }
  const {SimpleInput} = require('./SimpleInput')
  const {element, unmount} = render(SimpleInput, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const input = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'input')

  t.is(props.type, input.getAttribute('type'))
  t.ok(input.required)
  t.is(props.defaultValue, input.value)

  unmount()
})

test('is a controlled input', t => {
  const props = {
    name: 'name',
    label: 'name',
    type: 'email',
    value: 'james-bond@yahoo.com'
  }
  const {SimpleInput} = require('./SimpleInput')
  const {element, unmount} = render(SimpleInput, props)
  const ReactTestUtils = require('react-addons-test-utils')
  const input = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'input')

  t.is(props.value, input.value)

  input.value = 'steve-harris@outlook.com'

  ReactTestUtils.Simulate.change(input) // should revert input to original props.value

  t.is(props.value, input.value)

  unmount()
})
