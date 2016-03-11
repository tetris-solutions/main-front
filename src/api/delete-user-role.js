import {DELETE} from '@tetris/http'

export function deleteUserRole (id, config) {
  return DELETE(`${process.env.USER_API_URL}/user_role/${id}`, config)
}

export default deleteUserRole
