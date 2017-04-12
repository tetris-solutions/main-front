import React from 'react'
import PropTypes from 'prop-types'
import LocaleSelector from './HeaderLocaleSelector'
import {Link, IndexLink} from 'react-router'
import {logoutAction} from 'tetris-iso/actions'
import {branch} from 'baobab-react/higher-order'
import Message from 'tetris-iso/Message'

export class Header extends React.Component {
  static displayName = 'Header'

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  handleLogoutClick = (e) => {
    e.preventDefault()
    this.props.dispatch(logoutAction)
    this.context.router.push('/')
  }

  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <IndexLink className='navbar-brand' to='/'>Tetris</IndexLink>
          </div>

          {this.props.user ? (
            <ul ref='ul' className='nav navbar-nav navbar-right'>
              <li>
                <Link to='/dashboard'>
                  <Message>navDashboard</Message>
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
}

export default branch({user: ['user']}, Header)
