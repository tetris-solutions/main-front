import React from 'react'
import global from 'global'
import {branch} from 'baobab-react/higher-order'
import ActivationFailure from './ActivationFailure'
import ActivationSuccess from './ActivationSuccess'

const {PropTypes, createClass} = React

const Activation = createClass({
  displayName: 'Activation',
  propTypes: {
    activationError: PropTypes.object
  },
  render () {
    const {activationError} = this.props
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

export default branch(Activation, {
  cursors: {
    activationError: ['errors', 'activation']
  }
})
