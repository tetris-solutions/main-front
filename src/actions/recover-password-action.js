import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'
import {POST} from '@tetris/http'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import assign from 'lodash/assign'

function recoverPassword (email, config) {
  return Promise.resolve().then(() => {
    if (!email) throw new MissingRequiredFieldError('email')

    return POST(`${process.env.USER_API_URL}/recover-password`, assign({}, config, {
      body: {email}
    }))
  })
}

export function recoverPasswordAction (tree, email) {
  return recoverPassword(email, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default recoverPasswordAction
