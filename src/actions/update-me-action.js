import {updateMe} from '../api/update-me'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import {getApiFetchConfig} from '../functions/get-api-fetch-config'
import {pushResponseErrorToState} from '../functions/push-response-error-to-state'

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
    })
    .catch(pushResponseErrorToState(tree))
}

export default updateMeAction
