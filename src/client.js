import ReactDom from 'react-dom'
import getRoutes from './get-routes'
import {browserHistory} from 'react-router'

require('whatwg-fetch')

ReactDom.render(getRoutes(browserHistory),
  document.getElementById('app'))
