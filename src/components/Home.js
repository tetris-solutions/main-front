import React from 'react'
import PropTypes from 'prop-types'
import Message from 'tetris-iso/Message'
import Dashboard from './dashboard/Dashboard'
import {Link} from 'react-router'

export class Home extends React.Component {
  static displayName = 'Home'

  static contextTypes = {
    tree: PropTypes.object.isRequired
  }

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
}

export default Home
