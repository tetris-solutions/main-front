import React from 'react'
import createClass from 'create-react-class'
import PropTypes from 'prop-types'
import {branch} from 'baobab-react/higher-order'
import ActivationFailure from './ActivationFailure'
import ActivationSuccess from './ActivationSuccess'

export const Activation = createClass({
  displayName: 'Activation',
  propTypes: {
    activationError: PropTypes.object
  },
  render () {
    const {activationError} = this.props
    return activationError ? (
      <ActivationFailure>
        {activationError.message}
      </ActivationFailure>
    ) : (
      <ActivationSuccess/>
    )
  }
})

export default branch({
  activationError: ['errors', 'activation']
}, Activation)
