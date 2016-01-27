import React from 'react'
import login from '../actions/login'

const Login = React.createClass({
  displayName: 'Login',
  handleSubmit (e) {
    e.preventDefault()
    const {elements} = e.target
    login(elements.email.value, elements.password.value)
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

export default Login
