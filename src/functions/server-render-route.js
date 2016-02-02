import React from 'react'
import ReactDOMServer from '../../node_modules/react-dom/server'
import HTML from './../components/HTML'
import getRoutes from './../get-routes'
import {createMemoryHistory} from 'react-router'
import beautify from 'js-beautify'

/**
 * renders the app markup
 * @param location
 * @param tree
 * @returns {*}
 */
export default function serverRenderRoute (req, res) {
  const location = req.path
  const useBeautify = process.env.BEAUTIFY_HTML === 'true'
  const {tree} = res.locals
  const history = createMemoryHistory(location)
  const app = getRoutes(history, tree)
  const appMarkup = useBeautify
    ? ReactDOMServer.renderToStaticMarkup(app)
    : ReactDOMServer.renderToString(app)

  const markup = ReactDOMServer.renderToStaticMarkup(
    <HTML inject={tree.get()}>
    {appMarkup}
    </HTML>
  )

  tree.release()

  return res.send(useBeautify ? beautify.html(markup) : markup)
}
