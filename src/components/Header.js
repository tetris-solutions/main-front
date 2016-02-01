import React from 'react'
import LanguageSelector from './HeaderLanguageSelector'
import {Link, IndexLink} from 'react-router'
import logoutAction from '../actions/logout-action'
import {branch} from 'baobab-react/higher-order'

const {PropTypes} = React

const Header = React.createClass({
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
            <ul className='nav navbar-nav navbar-right'>
              <li><Link to='/me'>{user.name}</Link></li>
              <li>
                <a href='/' onClick={this.handleLogoutClick}>
                  Sair
                </a>
              </li>
            </ul>
          ) : (
            <ul className='nav navbar-nav navbar-right'>
              <li>
                <Link to='/signup'>Cadastrar</Link>
              </li>
              <li>
                <Link to='/login'>Login</Link>
              </li>
            </ul>
          )}

          <LanguageSelector />
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
