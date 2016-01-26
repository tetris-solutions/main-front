import React from 'react'
import ReactDOMServer from 'react-dom/server'

export default ({documentTitle = 'Tetris Solutions', inject = {}, children}) => (
  <html>
  <head>
    <meta charSet='UTF-8'/>
    <title>{documentTitle}</title>
    <link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css'/>
  </head>
  <body>
  <div id='app' dangerouslySetInnerHTML={{__html: ReactDOMServer.renderToString(children)}}/>
  <script dangerouslySetInnerHTML={{__html: `var backendPayload = ${JSON.stringify(inject)}`}}/>
  <script src='/client.js'></script>
  </body>
  </html>
)

