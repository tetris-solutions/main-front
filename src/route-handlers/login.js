import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Login from '../components/Login'
import Root from '../components/Root'
import HTML from '../components/HTML'

export default (req, res) => res.send(
  ReactDOMServer.renderToStaticMarkup(
    <HTML>
    <Root>
      <Login/>
    </Root>
    </HTML>
  )
)
