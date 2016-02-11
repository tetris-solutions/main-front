import React from 'react'
import skinDeep from 'skin-deep'
import each from 'lodash/each'
import merge from 'lodash/merge'
import stateTree from '../fixtures/stateTree'
import Tree from 'baobab'

const {PropTypes, createElement} = React
const router = {}

export default (Component, props, customTree) => {
  const tree = merge({}, stateTree, customTree)
  const context = merge({router}, tree)
  const baobabTree = new Tree(tree)

  if (props.actions) {
    each(props.actions, (fn, name) => {
      props.actions[name] = fn.bind(null, baobabTree)
    })
  }

  const Wrapper = React.createClass({
    displayName: 'Wrapper',

    render () {
      return createElement(Component, props)
    }
  })

  return skinDeep
    .shallowRender(createElement(Wrapper), context)
    .dive([Component.displayName])
    .getMountedInstance()
}
