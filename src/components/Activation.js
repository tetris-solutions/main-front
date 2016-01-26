import React from 'react'
import global from 'global'
import ActivationFailure from './ActivationFailure'
import ActivationSuccess from './ActivationSuccess'

const {backendPayload: {activationError}} = global

export default React.createClass({
  displayName: 'Activation',
  render () {
    return activationError
      ? (
      <ActivationFailure>
        {activationError.message}
      </ActivationFailure>
    ) : (
      <ActivationSuccess/>
    )
  }
})
