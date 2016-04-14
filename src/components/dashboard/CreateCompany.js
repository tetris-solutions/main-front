import React from 'react'
import FormMixin from '@tetris/front-server/lib/mixins/FormMixin'
import SimpleInput from '@tetris/front-server/lib/components/SimpleInput'
import SubmitButton from '@tetris/front-server/lib/components/SubmitButton'
import {branch} from 'baobab-react/dist-modules/higher-order'
import {createCompanyAction} from '../../actions/create-company-action'
import {loadUserCompaniesAction} from '../../actions/load-user-companies-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'

const {PropTypes} = React

export const CreateCompany = React.createClass({
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
          this.context.router.push(`/dashboard/company/${response.data.id}`)
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
