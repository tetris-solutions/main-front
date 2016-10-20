import React from 'react'
import FormMixin from './FormMixin'
import loginAction from '../actions/login-action'
import SimpleInput from './SimpleInput'
import {branch} from 'baobab-react/higher-order'
import SubmitButton from './SubmitButton'
import get from 'lodash/get'
import window from 'global/window'
import csjs from 'csjs'
import StyledMixin from './mixins/styled'
const {PropTypes} = React
const absolutePattern = /^https?:\/\//i
const style = csjs`
.container {
  padding-top: 20vh;
  height: 100vh;
  background-color: #e5e5e5;
}
.box {
  padding: 6em 4em 4em 4em;
  background: white;
  width: 400px;
  border-radius: 3px;
  margin: 0 auto;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
}
.logo {
  display: block;
  width: 200px;
  height: auto;
  margin: 0 auto 2em auto;
}
@media (max-width: 400px) {
  .box {
    width: 96%;
  }
}`

function isAbsolute (url) {
  return absolutePattern.test(url)
}

export const Login = React.createClass({
  mixins: [FormMixin, StyledMixin],
  style,
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
      <div className={`container-fluid ${style.container}`}>
        <form className={`${style.box}`} onSubmit={this.handleSubmit} method='POST'>
          <img className={`${style.logo}`} src='/img/tetris-logo.png'/>

          <SimpleInput
            name='email'
            type='email'
            placeholder={emailLabel}
            error={errors.email}
            onChange={this.dismissError}
            required/>

          <SimpleInput
            name='password'
            type='password'
            placeholder={passwordLabel}
            error={errors.password}
            onChange={this.dismissError}
            required/>

          <SubmitButton/>
        </form>
      </div>
    )
  }
})

export default branch({}, Login)
