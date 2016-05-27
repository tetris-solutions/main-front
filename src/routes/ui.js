import React from 'react'
import {IndexRoute, Route} from 'react-router'
import Login from '../components/Login'
import Activation from '../components/Activation'
import Home from '../components/Home'
import Signup from '../components/Signup'
import WaitingConfirmation from '../components/WaitingConfirmation'
import {root} from 'baobab-react/dist-modules/higher-order'
import {dashboardRoutes} from './ui-dashboard'
import Header from '../components/Header'

export function getRoutes (tree, protectRoute, preload, createRoot) {
  return (
    <Route path='/' component={root(tree, createRoot(Header))}>
      <IndexRoute component={Home}/>
      <Route path='login' component={Login}/>
      <Route path='signup' component={Signup}/>
      <Route path='waiting-confirmation' component={WaitingConfirmation}/>
      <Route path='activate/:activationCode' component={Activation}/>
      <Route onEnter={protectRoute}>
        {dashboardRoutes(preload)}
      </Route>
    </Route>
  )
}
