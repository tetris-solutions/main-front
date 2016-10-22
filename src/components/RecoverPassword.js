import React from 'react'
import FormMixin from './FormMixin'
import {recoverPasswordAction} from '../actions/recover-password-action'
import {branch} from 'baobab-react/higher-order'
import SubmitButton from './SubmitButton'
import AuthScreen, {Input, LangMenu} from './AuthScreen'
import Message from 'tetris-iso/Message'
import BlueLink from './BlueLink'

const {PropTypes} = React
const actionRowStyle = {marginTop: '1em'}

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
  getInitialState () {
    return {
      hasSentRecoveryEmail: false
    }
  },
  handleSubmit (e) {
    e.preventDefault()
    const {elements} = e.target
    this.preSubmit()
    return this.props
      .dispatch(recoverPasswordAction, elements.email.value)
      .then(() => this.setState({hasSentRecoveryEmail: true}))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {messages: {emailLabel}} = this.context
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

          <SubmitButton
            block
            color='blue'
            labelMessage='recoverPassword'/>

          <div className='row' style={actionRowStyle}>
            <div className='col-xs-8'>
              <BlueLink to='/login'>
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

export default branch({}, Login)
