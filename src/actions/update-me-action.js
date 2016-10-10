import {updateMe} from '../api/update-me'
import {saveResponseTokenAsCookie} from 'tetris-iso/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from 'tetris-iso/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from 'tetris-iso/lib/functions/push-response-error-to-state'

/**
 * fires a request to the update user api
 * @param {Baobab} tree state tree
 * @param {Object} user new user object
 * @returns {Promise} promise that resolves once action is complete
 */
export function updateMeAction (tree, user) {
  return updateMe(user, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      tree.set('user', response.data)
      tree.commit()

      return response
    })
    .catch(pushResponseErrorToState(tree))
}

export default updateMeAction
