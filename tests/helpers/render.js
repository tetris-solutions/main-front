import buildDOM from './dom'
import React from 'react'
import ReactTestUtils from 'react-addons-test-utils'
import assign from 'lodash/assign'
import stateTree from '../fixtures/stateTree'
import router from '../fixtures/router'

global.Intl = require('intl')
global.React = React
global.ReactIntl = require('react-intl/lib/react-intl')
require('react-intl/lib/locales')

const {PropTypes} = React

export default (Component, props) =>
  buildDOM().then(() => {
    const context = assign({router}, stateTree)

    const Wrapper = React.createClass({
      displayName: 'Wrapper',
      getChildContext () {
        return context
      },
      childContextTypes: {
        router: PropTypes.object,
        locales: PropTypes.string,
        messages: PropTypes.object
      },
      render () {
        return React.createElement(Component,
          assign({refs: Component.displayName}, props))
      }
    })

    try {
      const instance = ReactTestUtils.renderIntoDocument(React.createElement(Wrapper))
    } catch (e) {
      console.log('dumb', e)
    }
    return {
      component: instance.refs[Component.displayName],
      find: fn => ReactTestUtils.findAllInRenderedTree(instance, fn)
    }
  })
