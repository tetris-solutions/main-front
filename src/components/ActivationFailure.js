import React from 'react'
import {IndexLink} from 'react-router'
import Message from './intl/Message'

const {createClass, PropTypes} = React

export default createClass({
  displayName: 'Activation-Failure',
  propTypes: {
    children: PropTypes.node
  },
  render () {
    return (
      <div className='container'>
        <h1 className='page-header'>
          <Message>emailConfirmationFailure</Message>
        </h1>
        <p className='text-danger'>
          {this.props.children || (
            <Message>emailConfirmationDefaultDescription</Message>
          )}
        </p>
        <IndexLink to='/' className='btn btn-primary pull-right'>
          <Message>callToActionReturnHome</Message>
        </IndexLink>
      </div>
    )
  }
})
