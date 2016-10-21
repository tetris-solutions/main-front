import React from 'react'

export const HTML = ({documentTitle = 'Tetris Solutions', css, payload, children}) => (
  <html>
    <head>

      <meta charSet='UTF-8'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <title>{documentTitle}</title>
      <link rel='stylesheet' href='https://bootswatch.com/sandstone/bootstrap.css'/>
      <link rel='stylesheet' href='https://cdn.rawgit.com/daneden/animate.css/master/animate.css'/>
      <link rel='stylesheet' href='//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.min.css'/>
      <link rel='stylesheet' href='/css/ladda.min.css'/>
      <link rel='stylesheet' href='/css/flag-icon.min.css'/>

      <script
        id='state-injection'
        dangerouslySetInnerHTML={{__html: `var backendPayload = ${JSON.stringify(payload)}`}}/>

      <script src='/js/spin.min.js' defer/>
      <script src='/js/ladda.min.js' defer/>
      <script src='/js/client.js' defer/>
      <style id='style-injection' dangerouslySetInnerHTML={{__html: css}}/>
    </head>
    <body>

      <div id='app' dangerouslySetInnerHTML={{__html: children}}/>

    </body>
  </html>
)

const {PropTypes} = React

HTML.propTypes = {
  css: PropTypes.string,
  documentTitle: PropTypes.string,
  payload: PropTypes.object,
  children: PropTypes.node
}

export default HTML
