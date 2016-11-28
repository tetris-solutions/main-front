import bodyParser from 'body-parser'
import {protectedRouteMiddleware, performActionsMiddleware} from 'tetris-iso/server'
import {loadUserCompaniesActionServerAdaptor} from 'tetris-iso/actions'
import {activateRoute} from '../route-handlers/activate-route'
import {bridgeRoute} from '../route-handlers/bridge-route'
import {createDashUserRoute} from '../route-handlers/create-dash-user'
import {loadCompanyActionServerAdaptor} from '../actions/load-company-action'
import {loadCompanyPermissionsActionServerAdaptor} from '../actions/load-company-permissions-action'
import {loadRoleUsersActionServerAdaptor} from '../actions/load-role-users-action'
import {loadCompanyAccountsActionServerAdaptor} from '../actions/load-company-accounts-action'
import {loadAccountActionServerAdaptor} from '../actions/load-account-action'
import {loadPlansActionServerAdaptor} from '../actions/load-plans-action'
import {loadCompanyAppsActionServerAdaptor} from '../actions/load-company-apps-action'
import {loadTunnelInfoActionServerAdaptor} from '../actions/load-tunnel-info'

export function setAppRoutes (app, uiRoute) {
  app.get('/', uiRoute)
  app.get('/bridge/:token', bridgeRoute)

  app.get('/tunnel/:tunnelCode',
    performActionsMiddleware(loadTunnelInfoActionServerAdaptor),
    function (req, res, next) {
      if (res.get('Authorization')) {
        res.redirect(req.query.next || '/dashboard')
      } else {
        next()
      }
    },
    uiRoute)

  app.post('/dash/user', bodyParser.json(), createDashUserRoute)

  app.get('/error', uiRoute)
  app.get('/login', uiRoute)
  app.get('/signup', uiRoute)
  app.get('/recover-password', uiRoute)
  app.get('/reset-password/:email/:recoveryCode', uiRoute)
  app.get('/dashboard', protectedRouteMiddleware, uiRoute)
  app.get('/dashboard/profile', protectedRouteMiddleware, uiRoute)
  app.get('/waiting-confirmation', uiRoute)
  app.get('/activate/:activationCode', activateRoute(uiRoute))

  app.get('/dashboard/companies',
    protectedRouteMiddleware,
    performActionsMiddleware(loadUserCompaniesActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/create/company',
    protectedRouteMiddleware,
    uiRoute)

  app.get('/dashboard/company/:company/plans',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadUserCompaniesActionServerAdaptor,
      loadPlansActionServerAdaptor,
      loadCompanyActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/company/:company/info',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadUserCompaniesActionServerAdaptor,
      loadCompanyActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/company/:company/info/edit',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadUserCompaniesActionServerAdaptor,
      loadCompanyActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/company/:company/apps',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadUserCompaniesActionServerAdaptor,
      loadCompanyActionServerAdaptor,
      loadCompanyAppsActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/company/:company/accounts',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadUserCompaniesActionServerAdaptor,
      loadCompanyActionServerAdaptor,
      loadCompanyAccountsActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/account/:account',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadAccountActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/company/:company/roles',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadUserCompaniesActionServerAdaptor,
      loadCompanyActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/company/:company/roles/:role',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadUserCompaniesActionServerAdaptor,
      loadCompanyActionServerAdaptor,
      loadCompanyPermissionsActionServerAdaptor),
    uiRoute)

  app.get('/dashboard/company/:company/roles/:role/users',
    protectedRouteMiddleware,
    performActionsMiddleware(
      loadUserCompaniesActionServerAdaptor,
      loadCompanyActionServerAdaptor,
      loadRoleUsersActionServerAdaptor),
    uiRoute)
}
