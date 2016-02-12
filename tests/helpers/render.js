import React from 'react'
import ReactDOM from 'react-dom'
import assign from 'lodash/assign'
import stateTree from '../fixtures/stateTree'
import router from '../fixtures/router'

global.Intl = require('intl')
global.React = React
global.ReactIntl = require('react-intl/lib/react-intl')
require('react-intl/lib/locales')

const {PropTypes} = React

export default (Component, props) => {
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
        assign({ref: Component.displayName}, props))
    }
  })

  const wrapperDiv = document.createElement('div')
  document.body.appendChild(wrapperDiv)

  const instance = ReactDOM.render(React.createElement(Wrapper), wrapperDiv)
  const element = instance.refs[Component.displayName]

  return {
    element,
    unmount () {
      ReactDOM.unmountComponentAtNode(wrapperDiv)
      document.body.removeChild(wrapperDiv)
    }
  }
}
