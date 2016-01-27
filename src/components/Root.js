import React from 'react'
import Header from './Header'
import {branch} from 'baobab-react/higher-order'

const {PropTypes} = React

const Root = React.createClass({
  displayName: 'Root',
  propTypes: {
    children: PropTypes.node,
    user: PropTypes.object
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
    user: ['user']
  }
})
