import express from 'express'
import path from 'path'
import fetch from 'node-fetch'
import cookieParser from 'cookie-parser'

import initializeMiddleware from './middlewares/initialize-tree'
import localeMiddleware from './middlewares/locale'
import authMiddleware from './middlewares/auth'
import {debugMiddleware} from '@tetris/debug-middleware'

import morgan from 'morgan'

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

if (flags.developmentMode) {
  require('./dev-server-hook').devServerHook(app)
}

app.use(cookieParser())
app.use(debugMiddleware)
app.use(localeMiddleware)
app.use(initializeMiddleware)
app.use(authMiddleware)

require('./routes/express')
  .setAppRoutes(app)

app.use(function errorHandler (_err, req, res, next) {
  // @todo logging
  let body = `<h1>${_err.message}</h1>`
  if (req.debugMode) {
    body += `<pre><code>${_err.stack}</code></pre>`
  }
  res.status(500).send(body)
})

app.listen(3000)
