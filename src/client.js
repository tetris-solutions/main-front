import {createClient} from 'tetris-iso/client'
import {getRoutes} from './routes/ui'
import defaultState from './default-state'

require('./polyfill/canvas-to-blob')

createClient(getRoutes, defaultState)
