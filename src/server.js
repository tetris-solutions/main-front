import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import fetch from 'node-fetch'
import cookieParser from 'cookie-parser'
import initializeMiddleware from './middlewares/initialize-tree'
import authMiddleware from './middlewares/auth'
import morgan from 'morgan'

global.fetch = fetch
dotenv.config()

const app = express()
let loadRoute = name => require(`./route-handlers/${name}-route`).default

app.use(express.static(path.normalize(`${__dirname}/../public`)))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))
app.use(cookieParser())
app.use(initializeMiddleware)
app.use(authMiddleware)

if (process.env.NODE_ENV === 'development') {
  require('./dev-server-hook').default(app)
  loadRoute = name => (...args) => require(`./route-handlers/${name}-route`).default(...args)
}

app.get('/', loadRoute('default'))
app.get('/login', loadRoute('default'))
app.get('/signup', loadRoute('default'))
app.get('/me', loadRoute('default'))
app.get('/waiting-confirmation', loadRoute('default'))

app.get('/activate/:activationCode', loadRoute('activate'))

app.listen(3000)
