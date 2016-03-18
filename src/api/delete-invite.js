import {DELETE} from '@tetris/http'

export function deleteInvite (id, config) {
  return DELETE(`${process.env.USER_API_URL}/invite/${id}`, config)
}

export default deleteInvite
