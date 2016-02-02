import React from 'react'

export default ({documentTitle = 'Tetris Solutions', payload, children}) => (
  <html>
  <head>
    <meta charSet='UTF-8'/>
    <title>{documentTitle}</title>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'/>
    <link rel='stylesheet' href='/css/ladda.min.css'/>
    <script dangerouslySetInnerHTML={{__html: `var backendPayload = ${JSON.stringify(payload)}`}}/>
    <script src='/js/spin.min.js' defer/>
    <script src='/js/ladda.min.js' defer/>
    <script src='/client.js' defer/>
  </head>
  <body>
  <div id='app' dangerouslySetInnerHTML={{__html: children}}/>
  </body>
  </html>
)

