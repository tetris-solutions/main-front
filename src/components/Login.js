import React from 'react'
import FormMixin from '@tetris/front-server/lib/mixins/FormMixin'
import loginAction from '../actions/login-action'
import SimpleInput from '@tetris/front-server/lib/components/SimpleInput'
import {branch} from 'baobab-react/dist-modules/higher-order'
import SubmitButton from '@tetris/front-server/lib/components/SubmitButton'
import get from 'lodash/get'
import window from 'global/window'

const {PropTypes} = React
const absolutePattern = /^https?:\/\//i

function isAbsolute (url) {
  return absolutePattern.test(url)
}

export const Login = React.createClass({
  mixins: [FormMixin],
  displayName: 'Login',
  propTypes: {
    dispatch: PropTypes.func
  },
  contextTypes: {
    router: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired
  },
  handleSubmit (e) {
    e.preventDefault()
    const {elements} = e.target
    this.preSubmit()
    return this.props
      .dispatch(loginAction,
        elements.email.value,
        elements.password.value)
      .then(() => {
        const next = get(this, 'context.location.query.next') || '/'

        if (isAbsolute(next)) {
          window.location.href = next
        } else {
          this.context.router.push(next)
        }
      })
      .catch(this.handleSubmitException)
      .then(this.posSubmit)
  },
  render () {
    const {errors} = this.state
    return (
      <div className='container'>
        <form className='panel panel-default' onSubmit={this.handleSubmit} method='POST'>
          <section className='panel-body'>

            <SimpleInput
              name='email'
              type='email'
              label='email'
              error={errors.email}
              onChange={this.dismissError}
              required/>

            <SimpleInput
              name='password'
              type='password'
              label='password'
              error={errors.password}
              onChange={this.dismissError}
              required/>

            <SubmitButton/>
          </section>
        </form>
      </div>
    )
  }
})

export default branch({}, Login)
