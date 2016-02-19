import Tree from 'baobab'
import defaultState from '../default-state'

/**
 * writes a `Baobab` tree with the default state in `res.locals.tree`
 * @param {Object} req express request
 * @param {Object} res express response
 * @param {Function} next next handler
 * @returns {undefined}
 */
export function initializeTreeMiddleware (req, res, next) {
  res.locals.tree = new Tree(defaultState)
  next()
}

export default initializeTreeMiddleware
