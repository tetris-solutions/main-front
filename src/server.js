import express from 'express'
import path from 'path'

const app = express()
let loadRoute = name => require(`./route-handlers/${name}`).default

app.use(express.static(path.normalize(`${__dirname}/../public`)))

if (process.env.NODE_ENV === 'development') {
  require('./dev-server-hook').default(app)
  loadRoute = name => (...args) => require(`./route-handlers/${name}`).default(...args)
}

app.get('/', loadRoute('home'))

app.listen(3000)
