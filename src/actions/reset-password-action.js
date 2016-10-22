import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'
import {POST} from '@tetris/http'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import assign from 'lodash/assign'

function resetPassword (password, recoveryCode, config) {
  return Promise.resolve().then(() => {
    if (!password) throw new MissingRequiredFieldError('email')

    return POST(`${process.env.USER_API_URL}/reset-password/${recoveryCode}`, assign({}, config, {
      body: {password}
    }))
  })
}

export function resetPasswordAction (tree, password, recoveryCode) {
  return resetPassword(password, recoveryCode, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default resetPasswordAction
