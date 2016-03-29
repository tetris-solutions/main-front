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
import CompanyRole from './components/CompanyRole'
import RoleOptions from './components/RoleOptions'
import RoleUsers from './components/RoleUsers'
import CreateRole from './components/CreateRole'
import {CompanyAccounts} from './components/CompanyAccounts'
import {CompanyRoles} from './components/CompanyRoles'

import Profile from './components/Me'
import WaitingConfirmation from './components/WaitingConfirmation'
import {root} from 'baobab-react/higher-order'
import {requireAuth} from './functions/require-auth'
import {performLoadAction} from './functions/perform-load-action'
import {loadUserCompaniesActionRouterAdaptor} from './actions/load-user-companies-action'
import {loadCompanyActionRouterAdaptor} from './actions/load-company-action'
import {loadPermissionsActionRouterAdaptor} from './actions/load-permissions-action'
import {loadRoleUsersActionRouteAdaptor} from './actions/load-role-users-action'

const isServer = typeof window === 'undefined'

export default (history, tree) => {
  const protectRoute = isServer ? undefined : requireAuth(tree)
  let firstRender = true

  if (!isServer) {
    setTimeout(() => {
      firstRender = false
    }, 0)
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
  // @todo create Dashboard component; this component should present a list of companies, which would replace the current <select>. ALSO, breadcrumbs.
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
          <Route path='dashboard' component={Admin} onEnter={preload(loadUserCompaniesActionRouterAdaptor)}>
            <Route path='companies'>
              <IndexRoute component={CreateCompany}/>
              <Route path=':company' component={EditCompany} onEnter={preload(loadCompanyActionRouterAdaptor)}>
                <Route path='roles' component={CompanyRoles}>
                  <IndexRoute component={CreateRole}/>
                  <Route path=':role' component={CompanyRole}>
                    <IndexRoute component={RoleOptions} onEnter={preload(loadPermissionsActionRouterAdaptor)}/>
                    <Route path='users' component={RoleUsers} onEnter={preload(loadRoleUsersActionRouteAdaptor)}/>
                  </Route>
                </Route>
                <Route path='accounts' component={CompanyAccounts}/>
              </Route>
            </Route>
          </Route>
        </Route>

      </Route>
    </Router>
  )
}
