import React from 'react'
import FormMixin from '../mixins/FormMixin'
import SimpleInput from './SimpleInput'
import {branch} from 'baobab-react/higher-order'

const {PropTypes, createClass} = React

const Me = createClass({
  displayName: 'Me',
  mixins: [FormMixin],
  propTypes: {
    user: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()
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
            <form className='panel panel-default' onSubmit={this.handleSubmit}>
              <section className='panel-body'>

                <SimpleInput name='name'
                             label='Nome'
                             defaultValue={name}
                             error={errors.name}
                             onChange={this.dismissError}
                             required/>

                <SimpleInput name='email'
                             type='email'
                             label='E-mail'
                             defaultValue={email}
                             error={errors.email}
                             onChange={this.dismissError}
                             required/>

                <button className='btn btn-primary'>
                  Salvar
                </button>
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
  }
})
