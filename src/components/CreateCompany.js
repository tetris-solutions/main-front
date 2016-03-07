import React from 'react'
import FormMixin from '../mixins/FormMixin'
import SimpleInput from './SimpleInput'
import SubmitButton from './SubmitButton'
import {branch} from 'baobab-react/higher-order'
import {createCompanyAction} from '../actions/create-company-action'
import {getUserCompaniesAction} from '../actions/get-user-companies-action'

const {PropTypes} = React

export const CreateCompany = React.createClass({
  displayName: 'Create-Company',
  mixins: [FormMixin],
  contextTypes: {
    router: PropTypes.object
  },
  propTypes: {
    owner: PropTypes.string,
    actions: PropTypes.shape({
      createCompany: PropTypes.func,
      getUserCompanies: PropTypes.func
    })
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()
    const {target: {elements}} = e
    const company = {
      owner: this.props.owner,
      name: elements.name.value
    }

    this.props.actions.createCompany(company)
      .then(response => {
        this.context.router.push(`/admin/${response.data.id}`)
      })
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
  cursors: {
    owner: ['user', 'id']
  },
  actions: {
    createCompany: createCompanyAction,
    getUserCompanies: getUserCompaniesAction
  }
})
