import React from 'react'
import signupAction from '../actions/signup-action'
import FormMixin from '../mixins/FormMixin'
import SimpleInput from './SimpleInput'
import SubmitButton from './SubmitButton'
import {branch} from 'baobab-react/higher-order'

const {PropTypes} = React

export const Signup = React.createClass({
  displayName: 'Signup',
  mixins: [FormMixin],
  propTypes: {
    actions: PropTypes.shape({
      signup: PropTypes.func
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
      .signup({
        email: elements.email.value,
        password: elements.password.value,
        name: elements.name.value
      })
      .then(() => this.context.router.push('/waiting-confirmation'))
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit} method='POST'>
          <section className='panel-body'>

            <SimpleInput name='name'
                         label='name'
                         error={errors.name}
                         onChange={this.dismissError}
                         required/>

            <SimpleInput name='email'
                         type='email'
                         label='email'
                         error={errors.email}
                         onChange={this.dismissError}
                         required/>

            <SimpleInput name='password'
                         type='password'
                         label='password'
                         error={errors.password}
                         onChange={this.dismissError}
                         required/>

            <SubmitButton />
          </section>
        </form>
      </div>
    )
  }
})

export default branch(Signup, {
  actions: {
    signup: signupAction
  }
})
