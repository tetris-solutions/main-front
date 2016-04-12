import React from 'react'
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import {branch} from 'baobab-react/higher-order'
import some from 'lodash/some'
import SimpleInput from '@tetris/front-server/lib/components/SimpleInput'
import FormMixin from '@tetris/front-server/lib/mixins/FormMixin'
import SubmitButton from '@tetris/front-server/lib/components/SubmitButton'
import Message from '../intl/Message'
import {updateRoleAction} from '../../actions/update-role-action'
import {loadUserCompaniesAction} from '../../actions/load-user-companies-action'
import {loadCompanyAction} from '../../actions/load-company-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'

const {PropTypes} = React

export const RoleOptions = React.createClass({
  displayName: 'Role-Options',
  mixins: [FormMixin],
  propTypes: {
    role: PropTypes.object,
    permissions: PropTypes.array,
    params: PropTypes.object,
    actions: PropTypes.shape({
      updateRole: PropTypes.func
    })
  },
  handleSubmit (e) {
    e.preventDefault()
    this.preSubmit()

    const {elements} = e.target
    const permissions = []
    const {
      role, params: {company}, actions: {
      updateRole,
      loadUserCompanies,
      loadCompany,
      pushSuccessMessage
    }
    } = this.props

    forEach(this.props.permissions, ({id}) => {
      if (elements[id] && elements[id].checked) {
        permissions.push(id)
      }
    })

    return updateRole(role.id, elements.name.value, permissions)
      .then(() => Promise.all([
        loadUserCompanies(),
        loadCompany(company)
      ]))
      .then(() => pushSuccessMessage())
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    const {role: {id, name, permissions}} = this.props

    return (
      <form key={`edit-role-${id}`} className='well' method='POST' onSubmit={this.handleSubmit}>

        <SimpleInput
          name='name'
          label='roleName'
          error={errors.name}
          defaultValue={name}
          onChange={this.dismissError}
          required/>

        <div className='panel panel-default'>
          <div className='panel-heading'>
            <Message>permissionsHeader</Message>
          </div>
          <div className='panel-body'>
            {map(this.props.permissions, ({id, name}, index) => (
              <div className='checkbox' key={index}>
                <label>
                  <input
                    name={id}
                    type='checkbox'
                    defaultChecked={some(permissions, {id})}/> {name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className='text-right'>
          <SubmitButton/>
        </div>

      </form>
    )
  }
})

export default branch(RoleOptions, {
  cursors: {
    permissions: ['permissions']
  },
  actions: {
    updateRole: updateRoleAction,
    loadCompany: loadCompanyAction,
    loadUserCompanies: loadUserCompaniesAction,
    pushSuccessMessage: pushSuccessMessageAction
  }
})
