import React from 'react'
import Header from './Header'
import {branch} from 'baobab-react/higher-order'
import {ToastContainer, ToastMessage} from 'react-toastr'

const isServer = typeof window === 'undefined'
const ToastMessageFactory = React.createFactory(ToastMessage.animation)
const {PropTypes} = React

export const Root = React.createClass({
  displayName: 'Root',
  propTypes: {
    children: PropTypes.node,
    errors: PropTypes.array,
    user: PropTypes.object,
    intl: PropTypes.shape({
      locales: PropTypes.string,
      messages: PropTypes.object
    }),
    location: PropTypes.object,
    params: PropTypes.object
  },
  childContextTypes: {
    locales: PropTypes.string,
    messages: PropTypes.object,
    location: PropTypes.object,
    params: PropTypes.object
  },
  getChildContext () {
    const {location, params, intl: {locales, messages}} = this.props
    return {locales, messages, location, params}
  },
  addAlerts () {
    if (isServer) return
    let i
    const {errors} = this.props
    for (i = this.errorTailIndex; i < errors.length; i++) {
      const error = errors[i]
      const level = error.level || 'error'

      this.refs.toaster[level](error.message, null, {
        timeOut: 5 * 1000,
        extendedTimeOut: 10 * 1000
      })
    }
    this.errorTailIndex = i
  },
  componentDidMount () {
    this.errorTailIndex = 0
    this.addAlerts()
  },
  componentDidUpdate () {
    this.addAlerts()
  },
  render () {
    const {user} = this.props
    return <div>
      <Header user={user}/>
      {this.props.children}

      {!isServer && (
        <ToastContainer
          ref='toaster'
          toastMessageFactory={ToastMessageFactory}
          className='toast-top-right'/>)}
    </div>
  }
})

export default branch(Root, {
  cursors: {
    user: ['user'],
    intl: ['intl'],
    errors: ['errors']
  }
})
