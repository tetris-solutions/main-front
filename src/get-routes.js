import React from 'react'
import {Router, IndexRoute, Route} from 'react-router'
import Login from './components/Login'
import Activation from './components/Activation'
import Home from './components/Home'
import Root from './components/Root'

export default function getRoutes (history) {
  return (
    <Router history={history}>
      <Route path='/' component={Root}>
        <IndexRoute component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/activate/:activationCode' component={Activation}/>
      </Route>
    </Router>
  )
}