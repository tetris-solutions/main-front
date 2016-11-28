import React from 'react'
import FormMixin from './FormMixin'
import {createDashUserAction} from '../actions/create-dash-user-action'
import {branch} from 'baobab-react/higher-order'
import SubmitButton from './SubmitButton'
import AuthScreen, {Input, LangMenu} from './AuthScreen'
import Message from 'tetris-iso/Message'
import BlueLink from './BlueLink'

const {PropTypes} = React
const actionRowStyle = {marginTop: '1em'}

const Tunnel = React.createClass({
  mixins: [FormMixin],
  displayName: 'Tunnel',
  propTypes: {
    dispatch: PropTypes.func,
    location: PropTypes.shape({
      query: PropTypes.object
    }).isRequired,
    params: PropTypes.shape({
      token: PropTypes.string
    }).isRequired,
    tunnel: PropTypes.shape({
      name: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string
    }).isRequired
  },
  contextTypes: {
    messages: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()

    const {elements} = e.target
    const {dispatch, tunnel: {company, email, name}, location} = this.props

    const password = elements.password.value

    this.preSubmit()

    return dispatch(createDashUserAction, {email, company, name, password})
      .then(() => {
        window.location.href = location.query.next || '/dashboard'
      })
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {messages: {passwordLabel}} = this.context
    const {errors} = this.state
    const {tunnel: {name}} = this.props

    return (
      <AuthScreen>
        <form onSubmit={this.handleSubmit}>
          <h4>
            <Message html name={name}>tunnelHeader</Message>
          </h4>
          <br/>

          <Input
            name='password'
            type='password'
            placeholder={passwordLabel}
            error={errors.password}
            onChange={this.dismissError}
            required/>

          <SubmitButton
            block
            color='blue'/>

          <div className='row' style={actionRowStyle}>
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

export default branch({tunnel: ['tunnelInfo']}, Tunnel)
