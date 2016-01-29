import React from 'react'
import ReactDOMServer from '../../node_modules/react-dom/server'
import HTML from './../components/HTML'
import getRoutes from './../get-routes'
import {createMemoryHistory} from 'react-router'

/**
 * renders the app markup
 * @param location
 * @param tree
 * @returns {*}
 */
export default function serverRenderRoute (req, res) {
  const location = req.path
  const tree = res.locals.tree
  const history = createMemoryHistory(location)
  const markup = ReactDOMServer.renderToStaticMarkup(
    <HTML inject={tree.get()}>
    {getRoutes(history, tree)}
    </HTML>
  )
  tree.release()
  return res.send(markup)
}
