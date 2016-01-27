import React from 'react'
import global from 'global'
import get from 'lodash/get'
import ActivationFailure from './ActivationFailure'
import ActivationSuccess from './ActivationSuccess'

export default React.createClass({
  displayName: 'Activation',
  render () {
    const activationError = get(global, 'backendPayload.activationError')
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
