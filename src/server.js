import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import fetch from 'node-fetch'

global.fetch = fetch
dotenv.config()

const app = express()
let loadRoute = name => require(`./route-handlers/${name}`).default

app.use(express.static(path.normalize(`${__dirname}/../public`)))

if (process.env.NODE_ENV === 'development') {
  require('./dev-server-hook').default(app)
  loadRoute = name => (...args) => require(`./route-handlers/${name}`).default(...args)
}

app.get('/', loadRoute('home'))
app.get('/activate/:activationCode', loadRoute('activate'))
app.get('/login', loadRoute('login'))

app.listen(3000)
