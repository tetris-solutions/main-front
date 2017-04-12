import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import FormMixin from '../FormMixin'
import SimpleInput from '../SimpleInput'
import SubmitButton from '../SubmitButton'
import {branch} from 'baobab-react/higher-order'
import {createCompanyAction} from '../../actions/create-company-action'
import {loadUserCompaniesAction} from 'tetris-iso/actions'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'

export const CreateCompany = createReactClass({
  displayName: 'Create-Company',
  mixins: [FormMixin],
  contextTypes: {
    router: PropTypes.object
  },
  propTypes: {
    dispatch: PropTypes.func
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()

    const {dispatch} = this.props

    return dispatch(createCompanyAction, e.target.elements.name.value)
      .then(response => dispatch(loadUserCompaniesAction)
        .then(() => {
          this.context.router.push(`/dashboard/company/${response.data.id}/info`)
        }))
      .then(() => dispatch(pushSuccessMessageAction))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    return (
      <div>
        <br/>
        <form className='jumbotron' onSubmit={this.handleSubmit} method='POST'>
          <SimpleInput
            name='name'
            label='companyName'
            error={errors.name}
            onChange={this.dismissError}
            required/>
          <SubmitButton/>
        </form>
      </div>
    )
  }
})

export default branch({}, CreateCompany)
