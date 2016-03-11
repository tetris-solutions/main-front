import {POST} from '@tetris/http'
import assign from 'lodash/assign'

export function createUserRole (email, role, config) {
  return POST(`${process.env.USER_API_URL}/user_role`, assign({body: {email, role}}, config))
}

export default createUserRole
