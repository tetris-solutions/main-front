import React from 'react'
import signup from '../api/signup'
import FormMixin from '../mixins/FormMixin'
import SimpleInput from './SimpleInput'

const {PropTypes} = React

export default React.createClass({
  displayName: 'Signup',
  mixins: [FormMixin],
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
    })
      .then(() => this.context.router.push('/waiting-confirmation'))
      .catch(this.handleSubmitException)
  },
  render () {
    const {errors} = this.state
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit}>
          <section className='panel-body'>

            <SimpleInput name='name'
                         label='Nome'
                         error={errors.name}
                         onChange={this.dismissError}
                         required/>

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

            <button className='btn btn-primary'>
              Salvar
            </button>
          </section>
        </form>
      </div>
    )
  }
})
