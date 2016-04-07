import React from 'react'
import {branch} from 'baobab-react/higher-order'
import Message from './intl/Message'

const {PropTypes} = React

const ErrorScreen = React.createClass({
  displayName: 'Error-Screen',
  propTypes: {
    error: PropTypes.shape({
      message: PropTypes.string
    }),
    debugMode: PropTypes.bool
  },
  render () {
    const {debugMode, error} = this.props
    return (
      <div className='container'>

        <div className='alert alert-danger'>
          <h2>
            <Message>errorScreenHeader</Message>
          </h2>
          <hr/>
          <p>{error.message}</p>

          {debugMode && error.stack ? <pre>{error.stack}</pre> : null}
        </div>
      </div>
    )
  }
})

export default branch(ErrorScreen, {
  cursors: {
    error: ['error'],
    debugMode: ['debugMode']
  }
})
