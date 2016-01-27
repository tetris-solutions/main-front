import React from 'react'
import {Router, IndexRoute, Route} from 'react-router'
import Login from './components/Login'
import Activation from './components/Activation'
import Home from './components/Home'
import Root from './components/Root'
import Signup from './components/Signup'
import WaitingConfirmation from './components/WaitingConfirmation'
import {root} from 'baobab-react/higher-order'

export default (history, tree) => (
  <Router history={history}>
    <Route path='/' component={root(Root, tree)}>
      <IndexRoute component={Home}/>
      <Route path='/login' component={Login}/>
      <Route path='/signup' component={Signup}/>
      <Route path='/waiting-confirmation' component={WaitingConfirmation}/>
      <Route path='/activate/:activationCode' component={Activation}/>
    </Route>
  </Router>
)