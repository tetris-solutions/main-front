import React from 'react'
import Message from './intl/Message'
import map from 'lodash/map'
import {branch} from 'baobab-react/higher-order'
import SimpleInput from './SimpleInput'
import SubmitButton from './SubmitButton'
import FormMixin from '../mixins/FormMixin'
import {createUserRoleAction} from '../actions/create-user-role-action'
import {loadRoleUsersAction} from '../actions/load-role-users-action'
import {deleteUserRoleAction} from '../actions/delete-user-role-action'
import {pushSuccessMessageAction} from '../actions/push-success-message-action'

const {PropTypes} = React

export const RoleUsers = React.createClass({
  displayName: 'Role-Users',
  mixins: [FormMixin],
  propTypes: {
    role: PropTypes.object,
    params: PropTypes.object,
    actions: PropTypes.shape({
      createUserRole: PropTypes.func
    })
  },
  onSubmitUser (e) {
    e.preventDefault()
    this.preSubmit()
    const {target: {email}} = e
    const {actions: {pushSuccessMessage, createUserRole, loadRoleUsers}, params: {company, role}} = this.props

    return createUserRole(email.value, role)
      .then(() => loadRoleUsers(company, role))
      .then(() => pushSuccessMessage())
      .then(() => email.value = '')
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  removeUserRole (id) {
    const {actions: {deleteUserRole, loadRoleUsers}, params: {company, role}} = this.props

    return deleteUserRole(id).then(() => loadRoleUsers(company, role))
  },
  render () {
    const {errors} = this.state
    const {role: {users}} = this.props
    return (
      <div className='well'>
        <div className='list-group'>
          {map(users, ({user_role, name}, index) => (
            <div key={index} className='list-group-item'>
              <h4>
                {name}
                <a className='close' onClick={this.removeUserRole.bind(null, user_role)}>&times;</a>
              </h4>
            </div>
          ))}

          <form className='list-group-item' onSubmit={this.onSubmitUser}>
            <h4><Message>newRoleMemberLabel</Message></h4>
            <div className='row'>
              <div className='col-sm-10'>
                <SimpleInput name='email'
                             error={errors.email}
                             onChange={this.dismissError}
                             required/>
              </div>
              <div className='col-sm-2'>
                <SubmitButton>
                  <Message>callToActionInvite</Message>
                </SubmitButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
})

export default branch(RoleUsers, {
  actions: {
    createUserRole: createUserRoleAction,
    loadRoleUsers: loadRoleUsersAction,
    deleteUserRole: deleteUserRoleAction,
    pushSuccessMessage: pushSuccessMessageAction
  }
})
