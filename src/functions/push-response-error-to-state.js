/**
 * creates a `Promise.catch` handler that pushes the response error to the state
 * @param {Baobab} tree state tree
 * @returns {Function} catch handler
 */
export function pushResponseErrorToState (tree) {
  /**
   * pushes the error contained in the response to the state tree
   * @throws {Response}
   * @param {Response} response fetch Response
   * @returns {undefined}
   */
  function catchError (response) {
    tree.push('errors', response.data)
    throw response
  }

  return catchError
}

export default pushResponseErrorToState
