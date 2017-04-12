import FormMixin from './FormMixin'
import Message from 'tetris-iso/Message'
import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import SimpleInput from './SimpleInput'
import SubmitButton from './SubmitButton'
import {branch} from 'baobab-react/higher-order'

import signupAction from '../actions/signup-action'

export const Signup = createReactClass({
  displayName: 'Signup',
  mixins: [FormMixin],
  propTypes: {
    dispatch: PropTypes.func,
    location: PropTypes.shape({
      query: PropTypes.shape({
        email: PropTypes.string
      })
    })
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()
    const {elements} = e.target
    const {dispatch, location: {query}} = this.props

    this.preSubmit()

    dispatch(signupAction, {
      email: query.email || elements.email.value,
      password: elements.password.value,
      name: elements.name.value
    }).then(response => {
      const {router} = this.context
      const {companies} = response.data

      if (companies) {
        window.location.href = `/dashboard/company/${companies[0]}/apps`
      } else {
        router.push('/waiting-confirmation')
      }
    })
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    const {email} = this.props.location.query

    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit} method='POST'>
          <section className='panel-body'>

            <SimpleInput
              name='name'
              label='name'
              error={errors.name}
              onChange={this.dismissError}
              required/>

            {email ? (
              <div className='form-group'>
                <label className='control-label'>
                  <Message>emailLabel</Message>
                </label>
                <p className='form-control-static'>{email}</p>
              </div>) : (
              <SimpleInput
                name='email'
                type='email'
                label='email'
                error={errors.email}
                onChange={this.dismissError}
                required/>)}

            <SimpleInput
              name='password'
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

export default branch({}, Signup)
