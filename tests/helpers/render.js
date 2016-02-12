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
let wrapperDiv

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

  if (!wrapperDiv) {
    wrapperDiv = document.createElement('div')
    document.body.appendChild(wrapperDiv)
  }

  const instance = ReactDOM.render(React.createElement(Wrapper), wrapperDiv)
  const component = instance.refs[Component.displayName]

  return {
    component,
    kill () {
      ReactDOM.unmountComponentAtNode(wrapperDiv)
    }
  }
}
