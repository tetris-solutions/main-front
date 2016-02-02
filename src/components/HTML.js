import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default ({documentTitle = 'Tetris Solutions', inject = {}, children}) => (
  <html>
  <head>
    <meta charSet='UTF-8'/>
    <title>{documentTitle}</title>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'/>
    <link rel='stylesheet' href='/css/ladda.min.css'/>
    <script dangerouslySetInnerHTML={{__html: `var backendPayload = ${JSON.stringify(inject)}`}}/>
    <script src='/js/spin.min.js' defer></script>
    <script src='/js/ladda.min.js' defer></script>
    <script src='/client.js' defer></script>
  </head>
  <body>
  <div id='app' dangerouslySetInnerHTML={{__html: children}}/>
  </body>
  </html>
)

