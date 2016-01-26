import React from 'react'
import Header from './Header'

export default React.createClass({
  displayName: 'Root',
  propTypes: {
    children: React.PropTypes.node
  },
  render () {
    return <div>
      <Header/>
      {this.props.children}
    </div>
  }
})
