import express from 'express'
import path from 'path'
import fetch from 'node-fetch'
import cookieParser from 'cookie-parser'

import initializeMiddleware from './middlewares/initialize-tree'
import localeMiddleware from './middlewares/locale'
import authMiddleware from './middlewares/auth'

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

app.use(cookieParser())
app.use(localeMiddleware)
app.use(initializeMiddleware)
app.use(authMiddleware)

if (flags.developmentMode) {
  require('./dev-server-hook').devServerHook(app)
}

require('./routes/express')
  .setAppRoutes(app)

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
