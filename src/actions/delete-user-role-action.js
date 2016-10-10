import {deleteUserRole} from '../api/delete-user-role'
import {saveResponseTokenAsCookie, getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'

export function deleteUserRoleAction (tree, id) {
  return deleteUserRole(id, getApiFetchConfig(tree))
    .then(saveResponseTokenAsCookie)
    .catch(pushResponseErrorToState(tree))
}

export default deleteUserRoleAction
