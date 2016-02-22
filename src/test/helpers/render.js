import React from 'react'
import ReactDOM from 'react-dom'
import assign from 'lodash/assign'
import stateTree from '../fixtures/state-tree'
import router from '../fixtures/router'
import window from 'global/window'
import Baobab from 'baobab'

global.Intl = require('intl')
global.React = React
global.ReactIntl = require('react-intl/lib/react-intl')
require('react-intl/lib/locales')

const {PropTypes} = React

export function render (Component, props = null) {
  const context = assign({router}, stateTree)
  context.tree = new Baobab(stateTree)

  const Wrapper = React.createClass({
    displayName: 'Wrapper',
    getChildContext () {
      return context
    },
    childContextTypes: {
      router: PropTypes.object,
      locales: PropTypes.string,
      messages: PropTypes.object,
      tree: PropTypes.object
    },
    render () {
      return React.createElement(Component,
        assign({ref: Component.displayName}, props))
    }
  })

  const wrapperDiv = window.document.createElement('div')
  window.document.body.appendChild(wrapperDiv)

  const instance = ReactDOM.render(React.createElement(Wrapper), wrapperDiv)
  const element = instance.refs[Component.displayName]

  return {
    element,
    unmount () {
      ReactDOM.unmountComponentAtNode(wrapperDiv)
      window.document.body.removeChild(wrapperDiv)
    }
  }
}

export default render
