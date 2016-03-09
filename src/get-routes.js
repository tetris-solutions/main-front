import React from 'react'
import {Router, IndexRoute, Route} from 'react-router'
import Login from './components/Login'
import Activation from './components/Activation'
import Home from './components/Home'
import Root from './components/Root'
import Signup from './components/Signup'
import Admin from './components/Admin'
import EditCompany from './components/EditCompany'
import CreateCompany from './components/CreateCompany'
import Profile from './components/Me'
import WaitingConfirmation from './components/WaitingConfirmation'
import {root} from 'baobab-react/higher-order'

const isServer = typeof window === 'undefined'

export default (history, tree) => {
  function requireAuth (nextState, replace) {
    if (!tree.get('user')) {
      replace({
        pathname: '/login',
        state: {
          next: nextState.location.pathname
        }
      })
    }
  }

  let protectedRoute

  if (isServer) {
    protectedRoute = Component => ({
      component: Component
    })
  } else {
    protectedRoute = Component => ({
      component: Component,
      onEnter: requireAuth
    })
  }

  // @todo `protectedRoute` should receive a second argument `permission` or maybe create a new function `checkPermission`

  return (
    <Router history={history}>
      <Route path='/' component={root(Root, tree)}>
        <IndexRoute component={Home}/>
        <Route path='login' component={Login}/>
        <Route path='signup' component={Signup}/>
        <Route path='me' {...protectedRoute(Profile)}/>
        <Route path='waiting-confirmation' component={WaitingConfirmation}/>
        <Route path='activate/:activationCode' component={Activation}/>
        <Route path='admin' {...protectedRoute(Admin)}>
          <IndexRoute component={CreateCompany}/>
          <Route path=':company' component={EditCompany}/>
        </Route>
      </Route>
    </Router>
  )
}
