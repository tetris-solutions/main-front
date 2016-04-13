import React from 'react'
import Message from '@tetris/front-server/lib/components/intl/Message'

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
