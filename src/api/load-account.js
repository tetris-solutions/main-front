import {GET} from '@tetris/http'

export function loadAccount (id, config) {
  return GET(`${process.env.TKM_URL}/account/${id}`, config)
}
