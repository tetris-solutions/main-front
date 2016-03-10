import React from 'react'
import FormMixin from '../mixins/FormMixin'
import SimpleInput from './SimpleInput'
import SubmitButton from './SubmitButton'
import {branch} from 'baobab-react/higher-order'
import {createCompanyAction} from '../actions/create-company-action'
import {loadUserCompaniesAction} from '../actions/load-user-companies-action'

const {PropTypes} = React

export const CreateCompany = React.createClass({
  displayName: 'Create-Company',
  mixins: [FormMixin],
  contextTypes: {
    router: PropTypes.object
  },
  propTypes: {
    actions: PropTypes.shape({
      createCompany: PropTypes.func,
      loadUserCompanies: PropTypes.func
    })
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()
    const company = {
      name: e.target.elements.name.value
    }

    this.props.actions.createCompany(company)
      .then(response => this.props.actions.loadUserCompanies()
        .then(() => {
          this.context.router.push(`/admin/${response.data.id}`)
        }))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    return (
      <div>
        <br/>

        <form className='jumbotron' onSubmit={this.handleSubmit} method='POST'>
          <SimpleInput name='name'
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

export default branch(CreateCompany, {
  actions: {
    createCompany: createCompanyAction,
    loadUserCompanies: loadUserCompaniesAction
  }
})
