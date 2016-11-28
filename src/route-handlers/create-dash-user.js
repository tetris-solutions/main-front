import {POST} from '@tetris/http'
import {passTokenAhead} from 'tetris-iso/utils'

export function createDashUserRoute (req, res) {
  const fetchConfig = {
    body: req.body,
    headers: {
      'Accept-Language': req.locale,
      Authorization: `Key ${process.env.INTERNAL_API_KEY}`
    }
  }

  return POST(`${process.env.USER_API_URL}/dash/user`, fetchConfig)
    .then(passTokenAhead(req, res))
    .then(response => {
      res.json(response.data)
    })
    .catch(function onActivationError (response) {
      res.status(response.status).json(response.data)
    })
}

