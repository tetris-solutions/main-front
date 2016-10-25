require('@tetris/base-lib/intl')
require('./polyfill/canvas-to-blob')

const {createClient} = require('tetris-iso/client')
const {getRoutes} = require('./routes/ui')
const defaultState = require('./default-state').default

createClient(getRoutes, defaultState)
