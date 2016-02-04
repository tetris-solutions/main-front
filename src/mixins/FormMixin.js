import React from 'react'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import isEmpty from 'lodash/isEmpty'
import assign from 'lodash/assign'

const {PropTypes} = React

export default {
  getChildContext () {
    return {
      submitInProgress: this.state.submitInProgress
    }
  },
  childContextTypes: {
    submitInProgress: PropTypes.bool.isRequired
  },
  contextTypes: {
    messages: PropTypes.shape({
      missingRequiredField: PropTypes.string.isRequired
    })
  },
  getInitialState () {
    return {
      submitInProgress: false,
      errors: {}
    }
  },
  handleSubmitException (rejection) {
    const err = rejection instanceof window.Response ? rejection.data : rejection
    let newErrors

    if (err instanceof MissingRequiredFieldError) {
      newErrors = {[err.field]: this.context.messages.missingRequiredField}
    } else if (err.fields) {
      newErrors = err.fields
    }

    if (isEmpty(newErrors)) return

    this.setState(({errors}) => {
      assign(errors, newErrors)
      return {errors}
    })
  },
  dismissError ({target: {name}}) {
    this.setState(({errors}) => {
      delete errors[name]
      return {errors}
    })
  },
  preSubmit () {
    this.setState({errors: {}, submitInProgress: true})
  },
  posSubmit () {
    this.setState({submitInProgress: false})
  }
}
