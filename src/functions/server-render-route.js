import React from 'react'
import ReactDOMServer from '../../node_modules/react-dom/server'
import HTML from './../components/HTML'
import getRoutes from './../get-routes'
import {createMemoryHistory} from 'react-router'
import beautify from 'js-beautify'
import messages from '../messages'

global.React = React
global.ReactIntl = require('react-intl/lib/react-intl')
require('react-intl/lib/locales')

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

  tree.set('locale', req.locale)
  tree.set('intl', {
    locales: req.locale,
    messages: messages[req.locale]
  })
  tree.commit()

  const history = createMemoryHistory(location)
  const app = getRoutes(history, tree)
  const appMarkup = useBeautify
    ? ReactDOMServer.renderToStaticMarkup(app)
    : ReactDOMServer.renderToString(app)

  const markup = ReactDOMServer.renderToStaticMarkup(
    <HTML payload={tree.get()}>
    {appMarkup}
    </HTML>
  )

  tree.release()

  return res.send(useBeautify ? beautify.html(markup) : markup)
}
