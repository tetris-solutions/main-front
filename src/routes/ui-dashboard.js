import {Route, IndexRoute} from 'react-router'
import React from 'react'
import Dashboard from '../components/dashboard/Dashboard'
import Companies from '../components/dashboard/Companies'
import Company from '../components/dashboard/Company'
import CreateCompany from '../components/dashboard/CreateCompany'
import CompanyRole from '../components/dashboard/CompanyRole'
import RoleOptions from '../components/dashboard/RoleOptions'
import RoleUsers from '../components/dashboard/RoleUsers'
import CreateRole from '../components/dashboard/CreateRole'
import CompanyAccounts from '../components/dashboard/CompanyAccounts'
import CompanyRoles from '../components/dashboard/CompanyRoles'
import Profile from '../components/dashboard/Profile'
import AccountEdit from '../components/dashboard/AccountEdit'
import CompanyApps from '../components/dashboard/CompanyApps'
import CompanyPlans from '../components/dashboard/CompanyPlans'
import CompanyEdit from '../components/dashboard/CompanyEdit'
import CompanyInfo from '../components/dashboard/CompanyInfo'
import {restrict} from '../components/dashboard/Fence'

import {loadCompanyAccountsActionRouterAdaptor} from '../actions/load-company-accounts-action'
import {loadUserCompaniesActionRouterAdaptor} from 'tetris-iso/actions'
import {loadCompanyActionRouterAdaptor} from '../actions/load-company-action'
import {loadCompanyPermissionsActionRouterAdaptor} from '../actions/load-company-permissions-action'
import {loadRoleUsersActionRouteAdaptor} from '../actions/load-role-users-action'
import {loadAccountActionRouterAdaptor} from '../actions/load-account-action'
import {loadPlansActionRouterAdaptor} from '../actions/load-plans-action'
import {loadCompanyAppsActionRouterAdaptor} from '../actions/load-company-apps-action'

/**
 * get dashboard routes
 * @param {Function} preload function that creates an onEnter hook, used to run an action before rendering the route
 * @returns {Function} route
 */
export function dashboardRoutes (preload) {
  return (
    <Route path='dashboard' component={Dashboard}>
      <Route path='profile' component={Profile}/>

      <Route path='companies' component={Companies} onEnter={preload(loadUserCompaniesActionRouterAdaptor)}/>
      <Route path='create/company' component={restrict(CreateCompany, restrict.adminOnly)}/>

      <Route path='company/:company' component={Company} onEnter={preload(loadCompanyActionRouterAdaptor)}>
        <Route
          path='plans'
          component={restrict(CompanyPlans, restrict.canEditCompany)}
          onEnter={preload(loadPlansActionRouterAdaptor)}/>

        <Route path='info'>
          <IndexRoute component={CompanyInfo}/>
          <Route path='edit' component={restrict(CompanyEdit, restrict.canEditCompany)}/>
        </Route>

        <Route path='apps' component={CompanyApps} onEnter={preload(loadCompanyAppsActionRouterAdaptor)}/>

        <Route path='roles' component={restrict(CompanyRoles, restrict.canEditRole)}>
          <IndexRoute component={CreateRole}/>
          <Route path=':role' component={CompanyRole}>
            <IndexRoute component={RoleOptions} onEnter={preload(loadCompanyPermissionsActionRouterAdaptor)}/>
            <Route path='users' component={RoleUsers} onEnter={preload(loadRoleUsersActionRouteAdaptor)}/>
          </Route>
        </Route>

        <Route
          path='accounts'
          component={restrict(CompanyAccounts, restrict.canManageTokens)}
          onEnter={preload(loadCompanyAccountsActionRouterAdaptor)}/>
      </Route>

      <Route path='account/:account' component={AccountEdit} onEnter={preload(loadAccountActionRouterAdaptor)}/>
    </Route>
  )
}
