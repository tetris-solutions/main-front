import {deleteUserRole} from '../api/delete-user-role'
import {saveResponseTokenAsCookie} from 'tetris-iso/lib/functions/save-token-as-cookie'
import {getApiFetchConfig} from 'tetris-iso/lib/functions/get-api-fetch-config'
import {pushResponseErrorToState} from 'tetris-iso/lib/functions/push-response-error-to-state'

export function deleteUserRoleAction (tree, id) {
  return deleteUserRole(id, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default deleteUserRoleAction
