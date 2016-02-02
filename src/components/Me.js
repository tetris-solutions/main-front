import React from 'react'
import FormMixin from '../mixins/FormMixin'
import SimpleInput from './SimpleInput'
import {branch} from 'baobab-react/higher-order'
import updateMeAction from '../actions/update-me-action'
import SubmitButton from './SubmitButton'

const {PropTypes, createClass} = React

const Me = createClass({
  displayName: 'Me',
  mixins: [FormMixin],
  propTypes: {
    user: PropTypes.object.isRequired,
    actions: PropTypes.shape({
      updateMe: PropTypes.func
    })
  },
  handleSubmit (e) {
    e.preventDefault()
    const {target: {elements: {name, email, password, oldPassword}}} = e
    this.preSubmit()
    this.props.actions.updateMe({
      name: name.value,
      email: email.value,
      password: password.value,
      oldPassword: oldPassword.value
    })
    .catch(this.handleSubmitException)
    .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    const {user: {name, email, avatar}} = this.props
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-2'>
            <img className='img-responsive img-circle' src={avatar || 'http://placehold.it/320x320'}/>
          </div>
          <div className='col-sm-8 col-sm-offset-1'>
            <form className='panel panel-default' onSubmit={this.handleSubmit} method='POST'>
              <section className='panel-body'>

                <SimpleInput name='name'
                             label='name'
                             defaultValue={name}
                             error={errors.name}
                             onChange={this.dismissError}
                             required/>

                <SimpleInput name='email'
                             type='email'
                             label='email'
                             defaultValue={email}
                             error={errors.email}
                             onChange={this.dismissError}
                             required/>

                <SimpleInput name='oldPassword'
                             type='password'
                             label='currentPassword'
                             error={errors.oldPassword}
                             onChange={this.dismissError}/>

                <SimpleInput name='password'
                             type='password'
                             label='newPassword'
                             error={errors.password}
                             onChange={this.dismissError}/>
                <SubmitButton/>
              </section>
            </form>
          </div>
        </div>
      </div>
    )
  }
})

export default branch(Me, {
  cursors: {
    user: ['user']
  },
  actions: {
    updateMe: updateMeAction
  }
})
