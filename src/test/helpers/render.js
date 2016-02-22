import buildDOM from './dom'

export function initialize () {
  return buildDOM().then(() => {
    const React = require('react')

    global.Intl = require('intl')
    global.React = React
    global.ReactIntl = require('react-intl/lib/react-intl')
  })
}

export function render (Component, props = null) {
  const React = require('react')
  const ReactDOM = require('react-dom')
  const assign = require('lodash/assign')
  const {stateTree} = require('../fixtures/state-tree')
  const {router} = require('../fixtures/router')
  const window = require('global/window')
  const Baobab = require('baobab')

  global.Intl = require('intl')
  global.React = React
  global.ReactIntl = require('react-intl/lib/react-intl')

  require('react-intl/lib/locales')

  const {PropTypes} = React

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
