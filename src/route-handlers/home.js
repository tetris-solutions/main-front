import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Home from '../components/Home'
import HTML from '../components/HTML'

export default (req, res) => res.send(
  ReactDOMServer.renderToStaticMarkup(
    <HTML>
    <Home/>
    </HTML>
  )
)
