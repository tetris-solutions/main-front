import React from 'react'
import FormMixin from '../mixins/FormMixin'
import loginAction from '../actions/login-action'
import SimpleInput from './SimpleInput'
import {branch} from 'baobab-react/higher-order'
import SubmitButton from './SubmitButton'
import get from 'lodash/get'

const {PropTypes} = React

export const Login = React.createClass({
  mixins: [FormMixin],
  displayName: 'Login',
  propTypes: {
    actions: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()
    const {elements} = e.target
    this.preSubmit()
    return this.props.actions
      .login(
        elements.email.value,
        elements.password.value)
      .then(() => this.context
        .router.push(get(this, 'context.location.query.next') || '/'))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit} method='POST'>
          <section className='panel-body'>

            <SimpleInput
              name='email'
              type='email'
              label='email'
              error={errors.email}
              onChange={this.dismissError}
              required/>

            <SimpleInput
              name='password'
              type='password'
              label='password'
              error={errors.password}
              onChange={this.dismissError}
              required/>

            <SubmitButton/>
          </section>
        </form>
      </div>
    )
  }
})

export default branch(Login, {
  actions: {
    login: loginAction
  }
})
