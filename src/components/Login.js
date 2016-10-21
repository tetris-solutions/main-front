import React from 'react'
import FormMixin from './FormMixin'
import loginAction from '../actions/login-action'
import {branch} from 'baobab-react/higher-order'
import SubmitButton from './SubmitButton'
import get from 'lodash/get'
import window from 'global/window'
import AuthScreen, {Input} from './AuthScreen'

const {PropTypes} = React
const absolutePattern = /^https?:\/\//i

function isAbsolute (url) {
  return absolutePattern.test(url)
}

export const Login = React.createClass({
  mixins: [FormMixin],
  displayName: 'Login',
  propTypes: {
    dispatch: PropTypes.func
  },
  contextTypes: {
    messages: PropTypes.object.isRequired,
    router: PropTypes.object.isRequired,
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
        const next = get(this, 'context.location.query.next') || '/dashboard'

        if (isAbsolute(next)) {
          window.location.href = next
        } else {
          this.context.router.push(next)
        }
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
            color='blue'
            labelMessage='signIn'/>
        </form>
      </AuthScreen>
    )
  }
})

export default branch({}, Login)
