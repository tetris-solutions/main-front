import React from 'react'

export default React.createClass({
  render () {
    return (
      <nav className='navbar navbar-default'>
        <div className='container-fluid'>
          <div className='navbar-header'>
            <a className='navbar-brand' href='/'>Tetris</a>
          </div>
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='/login'>Login</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
})