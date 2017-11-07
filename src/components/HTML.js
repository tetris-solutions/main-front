import React from 'react'
import PropTypes from 'prop-types'

const revisionSuffix = process.env.DEV_SERVER
  ? ''
  : `.${require('../../package.json').version}`

export const HTML = ({documentTitle = 'Tetris Solutions', css, state, children}) => (
  <html>
    <head>

      <meta charSet='UTF-8'/>
      <meta name='viewport' content='width=device-width, initial-scale=1'/>
      <title>{documentTitle}</title>

      <link rel='shortcut icon' type='image/png' href='/img/favicon.png'/>
      <link rel='stylesheet' href='/css/bootstrap.min.css'/>
      <link rel='stylesheet' href='/css/animate.min.css'/>
      <link rel='stylesheet' href='/css/ladda.min.css'/>
      <link rel='stylesheet' href='/css/flag-icon.min.css'/>

      <link rel='stylesheet' href='/css/react-s-alert.css'/>
      <link rel='stylesheet' href='/css/react-s-alert-slide.css'/>
      <link rel='stylesheet' href='/css/react-s-alert-flip.css'/>

      <script
        id='state-injection'
        dangerouslySetInnerHTML={{__html: `var backendPayload = ${JSON.stringify(state)}`}}/>

      <script src='/js/spin.min.js' defer/>
      <script src='/js/ladda.min.js' defer/>

      <script src='/js/intl.min.js' defer/>
      <script src={`/js/intl/${state.locale}.js`} defer/>
      <script src={`/js/client${revisionSuffix}.js`} defer/>
      <style id='style-injection' dangerouslySetInnerHTML={{__html: css}}/>
    </head>
    <body>

      <div id='app' dangerouslySetInnerHTML={{__html: children}}/>

    </body>
  </html>
)

HTML.propTypes = {
  css: PropTypes.string,
  documentTitle: PropTypes.string,
  state: PropTypes.object,
  children: PropTypes.node
}

export default HTML
