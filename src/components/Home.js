import React from 'react'
import Message from 'tetris-iso/Message'

export const Home = React.createClass({
  displayName: 'Home',
  render () {
    return (
      <div className='container'>
        <h1>
          <Message>greetingMessage</Message>
        </h1>
      </div>
    )
  }
})

export default Home
