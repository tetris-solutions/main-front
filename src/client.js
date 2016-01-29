import ReactDom from 'react-dom'
import tree from './client-tree'
import getRoutes from './get-routes'
import {browserHistory} from 'react-router'
import Cookies from 'js-cookie'

require('whatwg-fetch')

ReactDom.render(getRoutes(browserHistory, tree),
  document.getElementById('app'))
