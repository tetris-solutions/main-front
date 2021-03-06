import {GET} from '@tetris/http'
import {passTokenAhead} from 'tetris-iso/utils'

function getUserByToken (token) {
  return GET(`${process.env.USER_API_URL}`, {
    headers: {Authorization: `Bearer ${token}`}
  })
}

export function activateRoute (uiRoute) {
  /**
   * calls activate user api; reads token from the response; sends the token to the client; calls load user api; send user object to the client
   * @todo should not return an error status code when the activation ended in success but not `getUserByToken`, think of an failure recovery for this edge case
   * @param {Object} req express request
   * @param {Object} res express response
   * @returns {Promise} a promise that resolves once the response has been sent
   */
  function actualRouteHandler (req, res) {
    return GET(`${process.env.USER_API_URL}/activate/${req.params.activationCode}`, {headers: {'Accept-Language': req.locale}})
      .then(passTokenAhead(req, res))
      .then(({token}) => getUserByToken(token))
      .then(response => {
        res.locals.tree.set('user', response.data)
        res.locals.tree.commit()
      })
      .catch(function onActivationError (response) {
        res.status(response.status)
        res.locals.tree.set(['errors', 'activation'], response.data)
        res.locals.tree.commit()
      })
      .then(() => uiRoute(req, res))
  }

  return actualRouteHandler
}

