import React from 'react'
import {IndexRoute, Route} from 'react-router'
import Login from './../components/Login'
import Activation from './../components/Activation'
import Home from './../components/Home'
import ErrorScreen from '../components/ErrorScreen'
import Signup from './../components/Signup'
import WaitingConfirmation from './../components/WaitingConfirmation'
import {root} from 'baobab-react/higher-order'
import {root as createRoot} from '@tetris/front-server/lib/higher-order/root'
import {dashboardRoutes} from './ui-dashboard'
import Header from '../components/Header'

export function getRoutes (tree, protectRoute, preload) {
  return (
    <Route path='/' component={root(createRoot(Header), tree)}>
      <IndexRoute component={Home}/>
      <Route path='login' component={Login}/>
      <Route path='signup' component={Signup}/>
      <Route path='waiting-confirmation' component={WaitingConfirmation}/>
      <Route path='activate/:activationCode' component={Activation}/>
      <Route path='error' component={ErrorScreen}/>
      <Route onEnter={protectRoute}>
        {dashboardRoutes(preload)}
      </Route>
    </Route>
  )
}
