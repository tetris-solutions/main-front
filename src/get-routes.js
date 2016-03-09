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
import {requireAuth} from './functions/require-auth'
import {performLoadAction} from './functions/perform-load-action'
import {loadUserCompaniesAction} from './actions/load-user-companies-action'
const isServer = typeof window === 'undefined'

export default (history, tree) => {
  let protectRoute = isServer ? undefined : requireAuth(tree)
  let firstRender = true

  if (!isServer) {
    setTimeout(() => firstRender = false, 0)
  }

  function preload (action) {
    if (isServer) return

    const hook = performLoadAction(tree, action)

    function onEnter (nextState, replace, callback) {
      if (firstRender) return callback()

      hook(nextState, replace, callback)
    }

    return onEnter
  }

  // @todo `protectedRoute` should receive a second argument `permission` or maybe create a new function `checkPermission`

  return (
    <Router history={history}>
      <Route path='/' component={root(Root, tree)}>
        <IndexRoute component={Home}/>
        <Route path='login' component={Login}/>
        <Route path='signup' component={Signup}/>
        <Route path='waiting-confirmation' component={WaitingConfirmation}/>
        <Route path='activate/:activationCode' component={Activation}/>

        <Route onEnter={protectRoute}>
          <Route path='me' component={Profile}/>

          <Route path='admin' component={Admin} onEnter={preload(loadUserCompaniesAction)}>
            <IndexRoute component={CreateCompany}/>
            <Route path=':company' component={EditCompany}/>
          </Route>
        </Route>

      </Route>
    </Router>
  )
}
