import {updateMe} from '../api/update-me'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

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
      tree.merge('user', response.data)
      tree.commit()

      return response
    })
    .catch(pushResponseErrorToState(tree))
}

export default updateMeAction
