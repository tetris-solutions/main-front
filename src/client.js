import React from 'react'
import ReactDom from 'react-dom'
import Login from './components/Login'
import Activation from './components/Activation'
import Home from './components/Home'
import Root from './components/Root'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'

require('whatwg-fetch')

ReactDom.render(
  <Router history={browserHistory}>
    <Route path='/' component={Root}>
      <IndexRoute component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/activate/:activationCode' component={Activation}/>
    </Route>
  </Router>, document.getElementById('app'))
