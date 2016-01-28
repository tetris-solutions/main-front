import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import isEmpty from 'lodash/isEmpty'
import assign from 'lodash/assign'
import global from 'global'

export default {
  getInitialState () {
    return {
      errors: {}
    }
  },
  handleSubmitException (rejection) {
    const err = rejection instanceof global.Response ? rejection.data : rejection
    let newErrors

    if (err instanceof MissingRequiredFieldError) {
      newErrors = {[err.field]: err.message}
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
      return errors
    })
  }
}
