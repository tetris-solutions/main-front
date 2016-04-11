import React from 'react'
import FormMixin from '../../mixins/FormMixin'
import SimpleInput from '../SimpleInput'
import SubmitButton from '../SubmitButton'
import {branch} from 'baobab-react/higher-order'
import {createRoleAction} from '../../actions/create-role-action'
import {loadCompanyAction} from '../../actions/load-company-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'

const {PropTypes} = React

export const CreateRole = React.createClass({
  displayName: 'Create-Role',
  mixins: [FormMixin],
  contextTypes: {
    router: PropTypes.object
  },
  propTypes: {
    params: PropTypes.object,
    actions: PropTypes.shape({
      createRole: PropTypes.func,
      loadUserCompanies: PropTypes.func,
      pushSuccessMessage: PropTypes.func
    })
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()

    const {params: {company}, actions: {createRole, loadCompany, pushSuccessMessage}} = this.props

    createRole(company, e.target.elements.name.value)
      .then(response => loadCompany(company)
        .then(() => {
          this.context.router.push(`/dashboard/company/${company}/roles/${response.data.id}`)
        }))
      .then(() => pushSuccessMessage())
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
            label='roleName'
            error={errors.name}
            onChange={this.dismissError}
            required/>

          <SubmitButton/>
        </form>
      </div>
    )
  }
})

export default branch(CreateRole, {
  actions: {
    createRole: createRoleAction,
    loadCompany: loadCompanyAction,
    pushSuccessMessage: pushSuccessMessageAction
  }
})
