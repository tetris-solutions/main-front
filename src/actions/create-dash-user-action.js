import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'
import {POST} from '@tetris/http'
import assign from 'lodash/assign'

function createDashUser (user, config) {
  return POST(`${process.env.FRONT_URL}/dash/user`, assign({body: user}, config))
}

export function createDashUserAction (tree, user) {
  return createDashUser(user, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}
