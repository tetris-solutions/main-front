import React from 'react'
import Message from 'tetris-iso/Message'

const NoTrespassing = () => (
  <div className='alert alert-warning'>
    <div className='page-header'>
      <h3>
        <Message>accessForbiddenTitle</Message>
      </h3>
    </div>
    <p>
      <Message>accessForbiddenDescription</Message>
    </p>
  </div>
)

NoTrespassing.displayName = 'No-Trespassing'

export default NoTrespassing
