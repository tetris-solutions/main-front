import React from 'react'
import ReactDOMServer from 'react-dom/server'
import HTML from './components/HTML'
import getRoutes from './get-routes'
import {createMemoryHistory} from 'react-router'

export default (location, props) => ReactDOMServer.renderToStaticMarkup(
  <HTML inject={props}>
  {getRoutes(createMemoryHistory(location))}
  </HTML>
)

