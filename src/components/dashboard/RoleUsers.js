import React from 'react'
import Message from '@tetris/front-server/lib/components/intl/Message'
import map from 'lodash/map'
import {branch} from 'baobab-react/higher-order'
import SimpleInput from '@tetris/front-server/lib/components/SimpleInput'
import SubmitButton from '@tetris/front-server/lib/components/SubmitButton'
import FormMixin from '@tetris/front-server/lib/mixins/FormMixin'
import {createUserRoleAction} from '../../actions/create-user-role-action'
import {loadRoleUsersAction} from '../../actions/load-role-users-action'
import {deleteUserRoleAction} from '../../actions/delete-user-role-action'
import {deleteInviteAction} from '../../actions/delete-invite-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'

const {PropTypes} = React

const RoleUser = React.createClass({
  displayName: 'Role-User',
  propTypes: {
    isOwner: PropTypes.bool.isRequired,
    removeUser: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string,
    pending: PropTypes.bool
  },
  removeUser () {
    this.props.removeUser(this.props.id)
  },
  render () {
    const {isOwner, name, pending} = this.props
    return (
      <div className='list-group-item'>
        <h4>
          {name + ' '}
          {pending && (
            <small>
              <sup className='label label-warning'>
                <Message>pendingInviteLabel</Message>
              </sup>
            </small>
          )}

          {isOwner && (
            <small>
              <sup className='label label-info'>
                <Message>companyOwnerLabel</Message>
              </sup>
            </small>
          )}

          {!isOwner && (
            <a className='close' onClick={this.removeUser}>
              &times;
            </a>)}
        </h4>
      </div>
    )
  }
})

export const RoleUsers = React.createClass({
  displayName: 'Role-Users',
  mixins: [FormMixin],
  propTypes: {
    company: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      owner: PropTypes.string
    }).isRequired,
    role: PropTypes.object,
    params: PropTypes.object,
    dispatch: PropTypes.func,
    actions: PropTypes.shape({
      createUserRole: PropTypes.func,
      deleteInvite: PropTypes.func,
      deleteUserRole: PropTypes.func,
      loadRoleUsers: PropTypes.func,
      pushSuccessMessage: PropTypes.func
    })
  },
  onSubmitUser (e) {
    e.preventDefault()
    this.preSubmit()
    const {target: {email}} = e
    const {dispatch, params: {company, role}} = this.props

    return dispatch(createUserRoleAction, email.value, role)
      .then(() => dispatch(loadRoleUsersAction, company, role))
      .then(() => dispatch(pushSuccessMessageAction))
      .then(() => {
        email.value = ''
      })
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  removeInvite (id) {
    const {dispatch, params: {company, role}} = this.props

    return dispatch(deleteInviteAction, id)
      .then(() => dispatch(loadRoleUsersAction, company, role))
  },
  removeUserRole (id) {
    const {dispatch, params: {company, role}} = this.props

    return dispatch(deleteUserRoleAction, id)
      .then(() => dispatch(loadRoleUsersAction, company, role))
  },
  render () {
    const {errors} = this.state
    const {company, role: {users}} = this.props

    return (
      <div className='well'>
        <div className='list-group'>

          {map(users, ({id: userId, user_role, pending, invite, name, email}, index) => (

            <RoleUser
              key={index}
              id={user_role || invite}
              isOwner={company.owner === userId}
              pending={pending}
              name={name || email}
              removeUser={pending ? this.removeInvite : this.removeUserRole}/>

          ))}

          <form className='list-group-item' onSubmit={this.onSubmitUser}>
            <h4><Message>newRoleMemberLabel</Message></h4>
            <div className='row'>
              <div className='col-sm-10'>

                <SimpleInput
                  name='email'
                  error={errors.email}
                  onChange={this.dismissError}
                  required/>

              </div>
              <div className='col-sm-2'>
                <SubmitButton/>
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
})

export default branch({}, RoleUsers)
