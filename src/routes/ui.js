import React from 'react'
import PropTypes from 'prop-types'
import {IndexRoute, Route} from 'react-router'
import Login from '../components/Login'
import RecoverPassword from '../components/RecoverPassword'
import ResetPassword from '../components/ResetPassword'
import Tunnel from '../components/Tunnel'
import Activation from '../components/Activation'
import Home from '../components/Home'
import Signup from '../components/Signup'
import WaitingConfirmation from '../components/WaitingConfirmation'
import {root} from 'baobab-react/higher-order'
import {dashboardRoutes} from './ui-dashboard'
import Header from '../components/Header'
import ErrorScreen from '../components/ErrorScreen'

const Main = ({children}) => (
  <div>
    <Header/>
    {children}
  </div>
)
Main.displayName = 'Main'
Main.propTypes = {
  children: PropTypes.node.isRequired
}

export function getRoutes (tree, protectRoute, preload, createRoot) {
  return (
    <Route path='/' component={root(tree, createRoot(null, ErrorScreen))}>
      <Route path='login' component={Login}/>
      <Route path='recover-password' component={RecoverPassword}/>
      <Route path='reset-password/:email/:recoveryCode' component={ResetPassword}/>
      <Route path='tunnel/:tunnelCode' component={Tunnel}/>

      <Route component={Main}>
        <IndexRoute component={Home}/>
        <Route path='signup' component={Signup}/>
        <Route path='waiting-confirmation' component={WaitingConfirmation}/>
        <Route path='activate/:activationCode' component={Activation}/>
        <Route onEnter={protectRoute}>
          {dashboardRoutes(preload)}
        </Route>
      </Route>
    </Route>
  )
}
