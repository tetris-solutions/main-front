import React from 'react'
import PropTypes from 'prop-types'
import {branch} from 'baobab-react/higher-order'
import Message from 'tetris-iso/Message'

function clearError (tree) {
  tree.set('error', null)
  tree.commit()
}

class ErrorScreen extends React.Component {
  static displayName = 'Error-Screen'

  static contextTypes = {
    router: PropTypes.object
  }

  static propTypes = {
    error: PropTypes.shape({
      message: PropTypes.string
    }).isRequired,
    dispatch: PropTypes.func.isRequired,
    debugMode: PropTypes.bool.isRequired
  }

  dropError = () => {
    this.props.dispatch(clearError)
    this.context.router.push('/')
  }

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

          {debugMode && error.stack ? (
            <div>
              <hr/>
              <pre>{error.stack}</pre>
            </div>) : null}

          <button type='button' className='btn btn-warning' onClick={this.dropError}>
            <Message>callToActionReturnHome</Message>
          </button>
        </div>
      </div>
    )
  }
}

export default branch({
  error: ['error'],
  debugMode: ['debugMode']
}, ErrorScreen)
