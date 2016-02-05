import React from 'react'
import Header from './Header'
import {branch} from 'baobab-react/higher-order'

const {PropTypes} = React

export const Root = React.createClass({
  displayName: 'Root',
  propTypes: {
    children: PropTypes.node,
    user: PropTypes.object,
    intl: PropTypes.shape({
      locales: PropTypes.string,
      messages: PropTypes.object
    })
  },
  childContextTypes: {
    locales: PropTypes.string,
    messages: PropTypes.object
  },
  getChildContext () {
    const {intl: {locales, messages}} = this.props
    return {locales, messages}
  },
  render () {
    const {user} = this.props
    return <div>
      <Header user={user}/>
      {this.props.children}
    </div>
  }
})

export default branch(Root, {
  cursors: {
    user: ['user'],
    intl: ['intl']
  }
})
