import React from 'react'

const Login = React.createClass({
  displayName: 'Login',
  render () {
    return (
      <form className='panel panel-default'>
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
    )
  }
})

export default Login
