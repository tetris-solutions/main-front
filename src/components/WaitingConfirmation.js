import React from 'react'
import Message from '@tetris/front-server/lib/components/intl/Message'

export default () => (
  <div className='container'>
    <div className='panel panel-default'>
      <div className='panel-body'>
        <h2 className='page-header'>
          <Message>accountCreationSuccessTitle</Message>
        </h2>
        <div className='well'>
          <Message tagName='p' html>
            accountCreationSuccessDescription
          </Message>
        </div>
      </div>
    </div>
  </div>
)
