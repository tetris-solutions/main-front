import React from 'react'
import FormMixin from '../FormMixin'
import SimpleInput from '../SimpleInput'
import {branch} from 'baobab-react/higher-order'
import updateMeAction from '../../actions/update-me-action'
import SubmitButton from '../SubmitButton'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import AvatarPicker from '../AvatarPicker'
import {updateUserAvatarAction} from '../../actions/update-user-avatar-action'

const {PropTypes, createClass} = React

export const Profile = createClass({
  displayName: 'Profile',
  mixins: [FormMixin],
  propTypes: {
    user: PropTypes.object.isRequired,
    dispatch: PropTypes.func
  },
  handleSubmit (e) {
    e.preventDefault()
    const {target: {elements: {name, email, password, oldPassword}}} = e
    this.preSubmit()
    const {dispatch} = this.props

    const form = {
      name: name.value,
      email: email.value,
      password: password.value,
      oldPassword: oldPassword.value
    }

    return dispatch(updateMeAction, form)
      .then(this.uploadAvatar)
      .then(() => dispatch(pushSuccessMessageAction))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  uploadAvatar () {
    /**
     * @type {AvatarPicker}
     */
    const av = this.refs.avatar
    const {dispatch} = this.props
    const upload = blob => dispatch(updateUserAvatarAction, blob)

    if (!av.hasImage()) {
      return Promise.resolve()
    }

    return av.getImageAsBlob().then(upload)
  },
  render () {
    const {errors} = this.state
    const {user: {name, email, avatar}} = this.props
    return (
      <div className='row'>
        <div className='col-sm-4'>
          <AvatarPicker ref='avatar' image={avatar}/>
        </div>
        <div className='col-sm-8'>
          <br/>
          <form className='panel panel-default' onSubmit={this.handleSubmit} method='POST'>
            <section className='panel-body'>
              <SimpleInput
                name='name'
                label='name'
                defaultValue={name}
                error={errors.name}
                onChange={this.dismissError}
                required/>

              <SimpleInput
                name='email'
                type='email'
                label='email'
                defaultValue={email}
                error={errors.email}
                onChange={this.dismissError}
                required/>

              <SimpleInput
                name='oldPassword'
                type='password'
                label='currentPassword'
                error={errors.oldPassword}
                onChange={this.dismissError}/>

              <SimpleInput
                name='password'
                type='password'
                label='newPassword'
                error={errors.password}
                onChange={this.dismissError}/>

              <SubmitButton/>
            </section>
          </form>
        </div>
      </div>
    )
  }
})

export default branch({user: ['user']}, Profile)
