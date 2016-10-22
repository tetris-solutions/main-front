import React from 'react'
import FormMixin from './FormMixin'
import {resetPasswordAction} from '../actions/reset-password-action'
import {loginAction} from '../actions/login-action'
import {branch} from 'baobab-react/higher-order'
import SubmitButton from './SubmitButton'
import AuthScreen, {Input, LangMenu} from './AuthScreen'
import Message from 'tetris-iso/Message'
import BlueLink from './BlueLink'

const {PropTypes} = React
const actionRowStyle = {marginTop: '1em'}

const ResetPassword = React.createClass({
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
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()

    const {elements} = e.target
    const {dispatch, params: {email, recoveryCode}} = this.props
    const newPassword = elements.password.value
    const repeatPassword = elements.repeat.value

    if (newPassword !== repeatPassword) {
      return this.setState({errors: {repeat: this.context.messages.passwordDoesNotMatch}})
    }

    this.preSubmit()

    return dispatch(resetPasswordAction, newPassword, recoveryCode)
      .then(() => dispatch(loginAction, email, newPassword))
      .then(() => this.context.router.push('/dashboard'))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {messages: {passwordLabel, repeatPasswordLabel}} = this.context
    const {errors} = this.state
    return (
      <AuthScreen>
        <form onSubmit={this.handleSubmit}>
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
            color='blue'/>

          <div className='row' style={actionRowStyle}>
            <div className='col-xs-8'>
              <BlueLink to='/'>
                <Message>backToLogin</Message>
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
