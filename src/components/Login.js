import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import FormMixin from './FormMixin'
import loginAction from '../actions/login-action'
import {branch} from 'baobab-react/higher-order'
import SubmitButton from './SubmitButton'
import get from 'lodash/get'
import window from 'global/window'
import AuthScreen, {Input, LangMenu, style} from './AuthScreen'
import Message from 'tetris-iso/Message'
import BlueLink from './BlueLink'

export const Login = createReactClass({
  mixins: [FormMixin],
  displayName: 'Login',
  propTypes: {
    dispatch: PropTypes.func
  },
  contextTypes: {
    messages: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()
    const {elements} = e.target
    this.preSubmit()
    return this.props
      .dispatch(loginAction,
        elements.email.value,
        elements.password.value)
      .then(() => {
        window.location.href = get(this, 'context.location.query.next') || '/dashboard'
      })
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {messages: {emailLabel, passwordLabel}} = this.context
    const {errors} = this.state
    return (
      <AuthScreen>
        <form onSubmit={this.handleSubmit}>
          <Input
            name='email'
            type='email'
            placeholder={emailLabel}
            error={errors.email}
            onChange={this.dismissError}
            required/>

          <Input
            name='password'
            type='password'
            placeholder={passwordLabel}
            error={errors.password}
            onChange={this.dismissError}
            required/>

          <SubmitButton
            block
            color='grey'
            labelMessage='signIn'/>

          <div className={`row ${style.actions}`}>
            <div className='col-xs-8'>
              <BlueLink to='/recover-password'>
                <Message>forgotPassword</Message>
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

export default branch({}, Login)
