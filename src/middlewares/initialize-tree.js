import Tree from 'baobab'
import defaultState from '../default-state'

/**
 * writes a `Baobab` tree with the default state in `res.locals.tree`
 * @param {object} req express request
 * @param {object} res express response
 * @param {function} next next handler
 * @returns {undefined}
 */
export default function initializeTreeMiddleware (req, res, next) {
  res.locals.tree = new Tree(defaultState)
  next()
}
