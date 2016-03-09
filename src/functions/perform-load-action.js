/**
 * creates an onEnter hook that performs a load action before rendering the route
 * @param {Baobab} tree state tree
 * @param {Function} action load action that will be called
 * @returns {onEnter} onEnter hook
 */
export function performLoadAction (tree, action) {
  /**
   * call action before entering
   * @param {Object} nextState next location state
   * @param {Function} replace replace location
   * @param {Function} callback onEnter callback
   * @returns {undefined}
   */
  function onEnter (nextState, replace, callback) {
    action(nextState, tree).then(() => callback(),
      _err => {
        // @todo show/redirect to error view
      })
  }
  return onEnter
}
