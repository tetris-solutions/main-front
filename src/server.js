import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import cookieParser from 'cookie-parser'
import protectedRouteMiddleware from './middlewares/protected'
import initializeMiddleware from './middlewares/initialize-tree'
import authMiddleware from './middlewares/auth'
import morgan from 'morgan'
import defaultRoute from './route-handlers/default-route'
import activateRoute from './route-handlers/activate-route'

global.fetch = fetch
dotenv.config()

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
app.use(initializeMiddleware)
app.use(authMiddleware)

if (flags.developmentMode) {
  require('./dev-server-hook').default(app)
}

app.get('/', defaultRoute)
app.get('/login', defaultRoute)
app.get('/signup', defaultRoute)
app.get('/me', protectedRouteMiddleware, defaultRoute)
app.get('/waiting-confirmation', defaultRoute)
app.get('/activate/:activationCode', activateRoute)

app.listen(3000)
