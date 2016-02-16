import React from 'react'
import ReactDom from 'react-dom'
import tree from './client-tree'
import getRoutes from './get-routes'
import {GET} from '@tetris/http'
import {browserHistory} from 'react-router'
import loadScript from './functions/load-script'
import window from 'global/window'

require('whatwg-fetch')

window.React = React

const loadedLocales = {
  [tree.get('locale')]: tree.get('intl')
}

loadScript('/js/react-intl.min.js')
  .then(() => {
    let hasRendered = false

    const render = () => {
      ReactDom.render(getRoutes(browserHistory, tree), window.document.getElementById('app'))
      hasRendered = true
    }

    function loadIntl (locale) {
      if (loadedLocales[locale]) return Promise.resolve(loadedLocales[locale])

      return GET(`/intl/${locale}`).then(({data}) => data)
    }

    window.tetrisLoadLocale = function (locale) {
      const src = '/js/' + locale.split('-')[0] + '.js'

      Promise.all([loadScript(src), loadIntl(locale)])
        .then(args => {
          const intl = args.pop()

          loadedLocales[locale] = intl
          tree.set('intl', intl)
          tree.commit()

          if (!hasRendered) render()
        })
    }

    window.tetrisLoadLocale(tree.get('locale'))
  })
