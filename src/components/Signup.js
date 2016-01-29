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
    this.preSubmit()
    signup({
      email: elements.email.value,
      password: elements.password.value,
      name: elements.name.value
    })
      .then(() => this.context.router.push('/waiting-confirmation'))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors, submitInProgress} = this.state
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit} method='POST'>
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

            <button disabled={submitInProgress} className='btn btn-primary'>
              {submitInProgress ? 'Enviando...' : 'Salvar'}
            </button>
          </section>
        </form>
      </div>
    )
  }
})
