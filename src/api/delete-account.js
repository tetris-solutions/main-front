import {DELETE} from '@tetris/http'

export function deleteAccount (id, config) {
  return DELETE(`${process.env.TKM_URL}/account/${id}`, config)
}

export default deleteAccount
