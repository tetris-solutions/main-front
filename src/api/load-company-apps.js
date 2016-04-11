import {GET} from '@tetris/http'

export function loadCompanyApps (id, config) {
  return GET(`${process.env.USER_API_URL}/company/${id}/apps`, config)
}
