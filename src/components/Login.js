import React from 'react'
import loginAction from '../actions/login-action'
import {branch} from 'baobab-react/higher-order'

const {PropTypes} = React

const Login = React.createClass({
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
    this.props.actions
      .login(elements.email.value, elements.password.value)
      .then(() => this.context.router.push('/'))
  },
  render () {
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit}>
          <section className='panel-body'>
            <div className='form-group'>
              <label>E-mail</label>
              <input className='form-control' name='email' required/>
            </div>
            <div className='form-group'>
              <label>Senha</label>
              <input className='form-control' type='password' name='password' required/>
            </div>
            <button className='btn btn-primary'>Submit</button>
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
