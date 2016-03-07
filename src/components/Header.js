import React from 'react'
import LocaleSelector from './HeaderLocaleSelector'
import {Link, IndexLink} from 'react-router'
import logoutAction from '../actions/logout-action'
import {branch} from 'baobab-react/higher-order'
import Message from './intl/Message'

const {PropTypes} = React

export const Header = React.createClass({
  displayName: 'Header',
  propTypes: {
    user: PropTypes.object,
    actions: PropTypes.shape({
      logout: PropTypes.func.isRequired
    })
  },
  contextTypes: {
    router: PropTypes.object.isRequired
  },
  handleLogoutClick (e) {
    e.preventDefault()
    this.props.actions.logout()
    this.context.router.push('/')
  },
  render () {
    const {user} = this.props
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <IndexLink className='navbar-brand' to='/'>Tetris</IndexLink>
          </div>

          {user ? (
            <ul ref='ul' className='nav navbar-nav navbar-right'>
              <li><Link to='/me'>{user.name}</Link></li>
              <li>
                <Link to='/admin'>
                  <Message>navAdmin</Message>
                </Link>
              </li>
              <li>
                <a href='/' onClick={this.handleLogoutClick}>
                  <Message>navLogout</Message>
                </a>
              </li>
            </ul>
          ) : (
            <ul ref='ul' className='nav navbar-nav navbar-right'>
              <li>
                <Link to='/signup'>
                  <Message>navSignup</Message>
                </Link>
              </li>
              <li>
                <Link to='/login'>
                  <Message>navLogin</Message>
                </Link>
              </li>
            </ul>
          )}

          <LocaleSelector />
        </div>
      </nav>
    )
  }
})

export default branch(Header, {
  actions: {
    logout: logoutAction
  }
})
