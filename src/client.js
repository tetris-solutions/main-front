import ReactDom from 'react-dom'
import tree from './client-tree'
import getRoutes from './get-routes'
import {browserHistory} from 'react-router'
import Cookies from 'js-cookie'

require('whatwg-fetch')

try {
  const authTokens = JSON.parse(window.localStorage.authTokens)
  if (Cookies.get(process.env.TOKEN_COOKIE_NAME) && !authTokens[process.env.USER_API_URL]) {

  }
} catch (e) {
  // ~~~
}

ReactDom.render(getRoutes(browserHistory, tree),
  document.getElementById('app'))
