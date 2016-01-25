import React from 'react'
import Login from './Login'

const Home = React.createClass({
  displayName: 'Home',
  render () {
    return (
      <div className='container'>
        <h1>Hello world!</h1>
        <hr/>
        <Login />
      </div>
    )
  }
})

export default Home
