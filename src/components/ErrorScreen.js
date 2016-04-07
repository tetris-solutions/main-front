import React from 'react'
import {branch} from 'baobab-react/higher-order'
import Message from './intl/Message'

const {PropTypes} = React

const ErrorScreen = React.createClass({
  displayName: 'Error-Screen',
  contextTypes: {
    router: PropTypes.object,
    route: PropTypes.object
  },
  propTypes: {
    error: PropTypes.shape({
      message: PropTypes.string
    }),
    actions: PropTypes.shape({
      clearRoute: PropTypes.func
    }),
    debugMode: PropTypes.bool
  },
  componentDidMount () {
    this.context.router.setRouteLeaveHook(this.context.route, this.routerWillLeave)
  },
  routerWillLeave () {
    this.props.actions.clearRoute()
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

          {debugMode && error.stack ? (
            <div>
              <hr/>
              <pre>{error.stack}</pre>
            </div>) : null}
        </div>
      </div>
    )
  }
})

export default branch(ErrorScreen, {
  cursors: {
    error: ['error'],
    debugMode: ['debugMode']
  },
  actions: {
    clearError (tree) {
      tree.set('error', null)
      tree.commit()
    }
  }
})
