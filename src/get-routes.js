import React from 'react'
import {Router, IndexRoute, Route} from 'react-router'
import Login from './components/Login'
import Activation from './components/Activation'
import Forbidden from './components/Forbidden'
import Home from './components/Home'
import Root from './components/Root'
import Signup from './components/Signup'
import Profile from './components/Me'
import WaitingConfirmation from './components/WaitingConfirmation'
import {root} from 'baobab-react/higher-order'

const isServer = typeof window === 'undefined'

export default (history, tree) => {
  let protectedRoute
  if (isServer) {
    protectedRoute = Component => ({
      component: tree.get('user') ? Component : Forbidden
    })
  } else {
    protectedRoute = Component => ({
      getComponent (location, callback) {
        if (tree.get('user')) {
          callback(null, Component)
        } else {
          callback(null, Forbidden)
        }
      }
    })
  }

  return (
    <Router history={history}>
      <Route path='/' component={root(Root, tree)}>
        <IndexRoute component={Home}/>
        <Route path='/login' component={Login}/>
        <Route path='/signup' component={Signup}/>
        <Route path='/me' {...protectedRoute(Profile)}/>
        <Route path='/waiting-confirmation' component={WaitingConfirmation}/>
        <Route path='/activate/:activationCode' component={Activation}/>
      </Route>
    </Router>
  )
}
