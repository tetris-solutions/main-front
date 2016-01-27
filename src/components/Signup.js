import React from 'react'
import signup from '../api/signup'

const {PropTypes} = React

export default React.createClass({
  displayName: 'Signup',
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()
    const {elements} = e.target
    signup({
      email: elements.email.value,
      password: elements.password.value,
      name: elements.name.value
    }).then(() => this.context.router.push('/waiting-confirmation'))
  },
  render () {
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit}>
          <section className='panel-body'>
            <div className='form-group'>
              <label>Nome</label>
              <input className='form-control' type='text' name='name' required/>
            </div>

            <div className='form-group'>
              <label>E-mail</label>
              <input className='form-control' type='email' name='email' required/>
            </div>

            <div className='form-group'>
              <label>Senha</label>
              <input className='form-control' type='password' name='password' required/>
            </div>

            <button className='btn btn-primary'>
              Salvar
            </button>
          </section>
        </form>
      </div>
    )
  }
})
