import {GET} from '@tetris/http'
import loadUser from '../api/load-user'
import serverRenderRoute from '../functions/server-render-route'
import passTokenAhead from '../functions/pass-token-ahead'

const {USER_API_URL} = process.env

export default (req, res) =>
  GET(`${USER_API_URL}/activate/${req.params.activationCode}`)
    .then(response => {
      passTokenAhead(req, res)(response)
      return loadUser(response.token)
    })
    .then(response => {
      res.locals.tree.set('user', response.data)
      res.locals.tree.commit()
    })
    .catch(function onActivationError (response) {
      res.status(response.status)
      res.locals.tree.set(['errors', 'activation'], response.data)
      res.locals.tree.commit()
      return true
    })
    .then(() => serverRenderRoute(req, res))
