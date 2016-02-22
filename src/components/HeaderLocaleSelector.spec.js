import test from 'ava'
import window from 'global/window'
import noop from 'lodash/noop'
import {render, initialize} from '../test/helpers/render'

test.before(initialize)

test('uses `props.locale` as `<select>` value', t => {
  const props = {
    userLocale: 'en',
    locale: 'pt-BR',
    actions: {
      changeLocale: noop
    }
  }
  const {HeaderLocaleSelector} = require('./HeaderLocaleSelector')
  const {element, unmount} = render(HeaderLocaleSelector, props)
  t.ok(element.refs.select)
  t.is(props.locale, element.refs.select.value)
  unmount()
})

test('uses `props.userLocale` as fallback for `<select>` value', t => {
  const props = {
    userLocale: 'pt-BR',
    locale: null,
    actions: {
      changeLocale: noop
    }
  }
  const {HeaderLocaleSelector} = require('./HeaderLocaleSelector')
  const {element, unmount} = render(HeaderLocaleSelector, props)

  t.ok(element.refs.select)
  t.is(props.userLocale, element.refs.select.value)

  unmount()
})

test('calls `props.actions.changeLocale` and `window.tetrisLoadLocale` onChange passing new locale', t => {
  const newLocale = 'en'
  const isProperLocale = locale => {
    t.is(locale, newLocale)
  }
  const props = {
    userLocale: 'pt-BR',
    locale: null,
    actions: {
      changeLocale: isProperLocale
    }
  }

  window.tetrisLoadLocale = isProperLocale
  const {HeaderLocaleSelector} = require('./HeaderLocaleSelector')
  const {element, unmount} = render(HeaderLocaleSelector, props)
  const ReactTestUtils = require('react-addons-test-utils')

  t.ok(element.refs.select)
  t.is(props.userLocale, element.refs.select.value)

  element.refs.select.value = newLocale
  ReactTestUtils.Simulate.change(element.refs.select)

  unmount()
})
