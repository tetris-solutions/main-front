import React from 'react'
import {Link, IndexLink} from 'react-router'

const {PropTypes} = React

export default React.createClass({
  displayName: 'Header',
  propTypes: {
    user: PropTypes.object
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
              <li>
                <a href='/settings'>Configurações</a>
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
        </div>
      </nav>
    )
  }
})
