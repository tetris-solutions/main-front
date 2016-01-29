import React from 'react'
import FormMixin from '../mixins/FormMixin'
import loginAction from '../actions/login-action'
import SimpleInput from './SimpleInput'
import {branch} from 'baobab-react/higher-order'

const {PropTypes} = React

const Login = React.createClass({
  mixins: [FormMixin],
  displayName: 'Login',
  propTypes: {
    actions: PropTypes.shape({
      login: PropTypes.func.isRequired
    })
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()
    const {elements} = e.target
    this.preSubmit()
    this.props.actions
      .login(elements.email.value, elements.password.value)
      .then(() => this.context.router.push('/'))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors, submitInProgress} = this.state
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit} method='POST'>
          <section className='panel-body'>
            <SimpleInput name='email'
                         type='email'
                         label='E-mail'
                         error={errors.email}
                         onChange={this.dismissError}
                         required/>

            <SimpleInput name='password'
                         type='password'
                         label='Senha'
                         error={errors.password}
                         onChange={this.dismissError}
                         required/>
            <button disabled={submitInProgress} className='btn btn-primary'>
              {submitInProgress ? 'Enviando...' : 'Salvar'}
            </button>
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
