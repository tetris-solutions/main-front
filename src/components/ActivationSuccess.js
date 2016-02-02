import React from 'react'
import {IndexLink} from 'react-router'
import Message from './intl/Message'

export default React.createClass({
  displayName: 'Activation-Success',
  render () {
    return (
      <div className='container'>
        <h1 className='page-header'>
          <Message>emailConfirmationSuccessTitle</Message>
        </h1>
        <p className='text-success'>
          <Message>emailConfirmationSuccess</Message>
        </p>
        <IndexLink to='/' className='btn btn-primary pull-right'>
          <Message>callToActionReturnHome</Message>
        </IndexLink>
      </div>
    )
  }
})
