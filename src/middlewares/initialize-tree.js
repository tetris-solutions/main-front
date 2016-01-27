import Tree from 'baobab'
import defaultState from '../default-state'

export default function initializeTreeMiddleware (req, res, next) {
  res.locals.tree = new Tree(defaultState)
  next()
}
