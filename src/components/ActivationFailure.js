import React from 'react'
import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import {IndexLink} from 'react-router'
import Message from 'tetris-iso/Message'

export const ActivationFailure = createClass({
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
        <div className='text-danger'>
          {this.props.children || (
            <Message>emailConfirmationFailureDefaultDescription</Message>
          )}
        </div>
        <IndexLink to='/' className='btn btn-primary pull-right'>
          <Message>callToActionReturnHome</Message>
        </IndexLink>
      </div>
    )
  }
})

export default ActivationFailure
