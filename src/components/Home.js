import React from 'react'
import Message from 'tetris-iso/Message'
import Dashboard from './dashboard/Dashboard'
import {Link} from 'react-router'

export const Home = React.createClass({
  displayName: 'Home',
  contextTypes: {
    tree: React.PropTypes.object.isRequired
  },
  render () {
    if (this.context.tree.get('user')) {
      return <Dashboard {...this.props}/>
    }

    return (
      <div className='container'>
        <h2 className='page-header'>
          <Message>greetingMessage</Message>
        </h2>

        <Link className='btn btn-default pull-right' to='/login'>
          <Message>navLogin</Message>
        </Link>

      </div>
    )
  }
})

export default Home
