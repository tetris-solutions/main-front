import React from 'react'
import Header from './Header'
import {branch} from 'baobab-react/higher-order'
import {ToastContainer, ToastMessage} from 'react-toastr'
import _moment from 'moment'

const isServer = typeof window === 'undefined'
const ToastMessageFactory = React.createFactory(ToastMessage.animation)
const {PropTypes} = React

export const Root = React.createClass({
  displayName: 'Root',
  propTypes: {
    children: PropTypes.node,
    alerts: PropTypes.array,
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
    params: PropTypes.object,
    moment: PropTypes.func
  },
  getChildContext () {
    const {location, params, intl: {locales, messages}} = this.props
    return {
      locales,
      messages,
      location,
      params,
      moment () {
        const m = _moment(...arguments)
        m.locale(locales)
        return m
      }
    }
  },
  addAlerts () {
    if (isServer) return
    let i
    const {alerts} = this.props
    for (i = this.alertTailIndex; i < alerts.length; i++) {
      const {message, level} = alerts[i]

      this.refs.toaster[level || 'error'](message, null, {
        timeOut: 5 * 1000,
        extendedTimeOut: 10 * 1000
      })
    }
    this.alertTailIndex = i
  },
  componentDidMount () {
    this.alertTailIndex = 0
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
    alerts: ['alerts']
  }
})
