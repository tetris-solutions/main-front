/* eslint-disable */
import _intl from '@tetris/base-lib/intl'
/* eslint-enable */
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

global.fetch = fetch

const flags = {
  developmentMode: process.env.NODE_ENV === 'development',
  productionMode: process.env.NODE_ENV === 'production'
}

const app = express()

app.use(express.static(path.normalize(`${__dirname}/../public`)))
app.use(morgan(flags.productionMode === 'production'
  ? 'combined'
  : 'dev'
))

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

app.get('/admin',
  protectedRouteMiddleware,
  performActionsMiddleware(loadUserCompaniesActionServerAdaptor),
  defaultRoute)

app.get('/admin/:company',
  protectedRouteMiddleware,
  performActionsMiddleware(
    loadUserCompaniesActionServerAdaptor,
    loadCompanyActionServerAdaptor),
  defaultRoute)

app.use(function errorHandler (_err, req, res, next) {
  // @todo logging
  // @todo show/redirect to error view
  // console.log('### got err ###')
  // console.log(err)
  // console.log('### stack ###')
  // console.log(err.stack)
  res.status(500).send('Something really awful happened')
})

app.listen(3000)
