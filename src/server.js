import express from 'express'
import path from 'path'
import fetch from 'node-fetch'
import cookieParser from 'cookie-parser'

import protectedRouteMiddleware from './middlewares/protected'
import initializeMiddleware from './middlewares/initialize-tree'
import localeMiddleware from './middlewares/locale'
import authMiddleware from './middlewares/auth'
import {performActionsMiddleware} from './middlewares/perform-actions'

import morgan from 'morgan'
import defaultRoute from './route-handlers/default-route'
import activateRoute from './route-handlers/activate-route'
import intlRoute from './route-handlers/intl-route'
import {loadUserCompaniesActionServerAdaptor} from './actions/load-user-companies-action'
import {loadCompanyActionServerAdaptor} from './actions/load-company-action'
import {loadPermissionsActionServerAdaptor} from './actions/load-permissions-action'
import {loadRoleUsersActionServerAdaptor} from './actions/load-role-users-action'
import {httpLogStream} from './logger'

global.fetch = fetch

const flags = {
  developmentMode: !process.env.BUILD_PROD,
  productionMode: process.env.NODE_ENV === 'production'
}

const app = express()

app.use(express.static(path.normalize(`${__dirname}/../public`)))

const morganMode = flags.productionMode === 'production'
  ? 'combined'
  : 'short'

app.use(morgan(morganMode, {stream: httpLogStream}))

app.use(cookieParser())
app.use(localeMiddleware)
app.use(initializeMiddleware)
app.use(authMiddleware)

if (flags.developmentMode) {
  require('./dev-server-hook').devServerHook(app)
}

app.get('/intl/:locale', intlRoute)
app.get('/', defaultRoute)
app.get('/login', defaultRoute)
app.get('/signup', defaultRoute)
app.get('/me', protectedRouteMiddleware, defaultRoute)
app.get('/waiting-confirmation', defaultRoute)
app.get('/activate/:activationCode', activateRoute)

app.get('/dashboard/companies',
  protectedRouteMiddleware,
  performActionsMiddleware(loadUserCompaniesActionServerAdaptor),
  defaultRoute)

app.get('/dashboard/companies/:company',
  protectedRouteMiddleware,
  performActionsMiddleware(
    loadUserCompaniesActionServerAdaptor,
    loadCompanyActionServerAdaptor),
  defaultRoute)

app.get('/dashboard/companies/:company/accounts',
  protectedRouteMiddleware,
  performActionsMiddleware(
    loadUserCompaniesActionServerAdaptor,
    loadCompanyActionServerAdaptor),
  defaultRoute)

app.get('/dashboard/companies/:company/roles',
  protectedRouteMiddleware,
  performActionsMiddleware(
    loadUserCompaniesActionServerAdaptor,
    loadCompanyActionServerAdaptor),
  defaultRoute)

app.get('/dashboard/companies/:company/roles/:role',
  protectedRouteMiddleware,
  performActionsMiddleware(
    loadUserCompaniesActionServerAdaptor,
    loadCompanyActionServerAdaptor,
    loadPermissionsActionServerAdaptor),
  defaultRoute)

app.get('/dashboard/companies/:company/roles/:role/users',
  protectedRouteMiddleware,
  performActionsMiddleware(
    loadUserCompaniesActionServerAdaptor,
    loadCompanyActionServerAdaptor,
    loadRoleUsersActionServerAdaptor),
  defaultRoute)

app.use(function errorHandler (_err, req, res, next) {
  // @todo logging
  // @todo show/redirect to error view
  // console.log('### got err ###')
  // console.log(err)
  // console.log('### stack ###')
  // console.log(err.stack)
  res.status(500).send(`
    <h1>${_err.message}</h1>
    <pre><code>${_err.stack}</code></pre>`)
})

app.listen(3000)
