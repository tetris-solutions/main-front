import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import Message from 'tetris-iso/Message'
import ButtonWithPrompt from 'tetris-iso/ButtonWithPrompt'
import StyledMixin from 'tetris-iso/lib/components/mixins/styled'
import map from 'lodash/map'
import {branch} from 'baobab-react/higher-order'
import SimpleInput from '../SimpleInput'
import SubmitButton from '../SubmitButton'
import FormMixin from '../FormMixin'
import {createUserRoleAction} from '../../actions/create-user-role-action'
import {loadRoleUsersAction} from '../../actions/load-role-users-action'
import {deleteUserRoleAction} from '../../actions/delete-user-role-action'
import {deleteInviteAction} from '../../actions/delete-invite-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import flow from 'lodash/flow'
import csjs from 'csjs'

const style = csjs`
.x {
  color: rgb(70, 70, 70) !important;
}`

const Confirm = ({roleName, userName, dismiss, confirm}) => (
  <div>
    <div className='modal-header'>
      <h3 className='modal-title'>
        <Message>confirmRoleUserDeleteHeader</Message>
      </h3>
    </div>

    <div className='modal-body'>
      <Message user={userName} role={roleName} html>
        confirmUserDeleteBody
      </Message>
    </div>

    <div className='modal-footer'>
      <button className='btn btn-success' type='button' onClick={flow(dismiss, confirm)}>
        <Message>
          confirmAction
        </Message>
      </button>

      <button className='btn btn-danger' type='button' onClick={dismiss}>
        <Message>cancelAction</Message>
      </button>
    </div>
  </div>
)

Confirm.propTypes = {
  userName: PropTypes.string.isRequired,
  roleName: PropTypes.string.isRequired,
  confirm: PropTypes.func.isRequired,
  dismiss: PropTypes.func.isRequired
}

class RoleUser extends React.Component {
  static displayName = 'Role-User'

  static propTypes = {
    isOwner: PropTypes.bool.isRequired,
    removeUser: PropTypes.func.isRequired,
    userName: PropTypes.string,
    userEmail: PropTypes.string.isRequired,
    roleName: PropTypes.string.isRequired,
    id: PropTypes.string,
    pending: PropTypes.bool
  }

  removeUser = () => {
    this.props.removeUser(this.props.id)
  }

  render () {
    const {isOwner, roleName, userName, userEmail, pending} = this.props
    return (
      <div className='list-group-item'>
        <h4>
          {(userName || userEmail) + ' '}
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
            <ButtonWithPrompt label='&times;' className={`close ${style.x}`}>{({dismiss}) =>
              <Confirm
                roleName={roleName}
                userName={userName || userEmail}
                confirm={this.removeUser}
                dismiss={dismiss}/>}
            </ButtonWithPrompt>)}

          {userName && userEmail && (
            <p>
              <small>{userEmail}</small>
            </p>
          )}
        </h4>
      </div>
    )
  }
}

export const RoleUsers = createReactClass({
  displayName: 'Role-Users',
  mixins: [FormMixin, StyledMixin],
  style,
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
    const {company, role} = this.props

    return (
      <div className='well'>
        <div className='list-group'>

          {map(role.users, ({id: userId, user_role, pending, invite, name, email}, index) => (
            <RoleUser
              key={index}
              roleName={role.name}
              id={user_role || invite}
              isOwner={company.owner === userId}
              pending={pending}
              userName={name}
              userEmail={email}
              removeUser={pending ? this.removeInvite : this.removeUserRole}/>))}

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
