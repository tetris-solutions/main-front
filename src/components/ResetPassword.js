import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import FormMixin from './FormMixin'
import {resetPasswordAction} from '../actions/reset-password-action'
import {branch} from 'baobab-react/higher-order'
import SubmitButton from './SubmitButton'
import AuthScreen, {Input, LangMenu, style} from './AuthScreen'
import Message from 'tetris-iso/Message'
import BlueLink from './BlueLink'

const ResetPassword = createReactClass({
  mixins: [FormMixin],
  displayName: 'Reset-Password',
  propTypes: {
    dispatch: PropTypes.func,
    params: PropTypes.shape({
      email: PropTypes.string,
      recoveryCode: PropTypes.string
    }).isRequired
  },
  contextTypes: {
    messages: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()

    const {elements} = e.target
    const {dispatch, params: {recoveryCode}} = this.props
    const newPassword = elements.password.value
    const repeatPassword = elements.repeat.value

    if (newPassword !== repeatPassword) {
      return this.setState({errors: {repeat: this.context.messages.passwordDoesNotMatch}})
    }

    this.preSubmit()

    return dispatch(resetPasswordAction, newPassword, recoveryCode)
      .then(() => {
        window.location.href = '/dashboard'
      })
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {messages: {passwordLabel, repeatPasswordLabel}} = this.context
    const {errors} = this.state
    return (
      <AuthScreen>
        <form onSubmit={this.handleSubmit}>
          <div className='form-group'>
            <label className='control-label'>
              <Message>emailLabel</Message>
            </label>
            <p className='form-control-static'>{this.props.params.email}</p>
          </div>

          <Input
            name='password'
            type='password'
            placeholder={passwordLabel}
            error={errors.password}
            onChange={this.dismissError}
            required/>

          <Input
            name='repeat'
            type='password'
            placeholder={repeatPasswordLabel}
            error={errors.repeat}
            onChange={this.dismissError}
            required/>

          <SubmitButton
            block
            color='grey'/>

          <div className={`row ${style.actions}`}>
            <div className='col-xs-8'>
              <BlueLink to='/'>
                <Message>cancelAction</Message>
              </BlueLink>
            </div>
            <div className='col-xs-4 text-right'>
              <LangMenu/>
            </div>
          </div>
        </form>
      </AuthScreen>
    )
  }
})

export default branch({}, ResetPassword)
