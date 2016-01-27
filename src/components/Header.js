import React from 'react'
import {Link, IndexLink} from 'react-router'

export default React.createClass({
  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <IndexLink className='navbar-brand' to='/'>Tetris</IndexLink>
          </div>
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <Link to='/signup'>Cadastrar</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
})
