import React from 'react'
import {POST} from '@tetris/http'

const {USER_API_URL} = process.env

const Login = React.createClass({
  displayName: 'Login',
  handleSubmit (e) {
    e.preventDefault()
    const {target: {elements: {email, password}}} = e
    POST(`${USER_API_URL}/login`, {
      body: {
        email: email.value,
        password: password.value
      }
    })
  },
  render () {
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit}>
          <section className='panel-body'>
            <div className='form-group'>
              <label>email</label>
              <input className='form-control' name='email'/>
            </div>
            <div className='form-group'>
              <label>password</label>
              <input className='form-control' type='password' name='password'/>
            </div>
            <button className='btn btn-primary'>Submit</button>
          </section>
        </form>
      </div>
    )
  }
})

export default Login
