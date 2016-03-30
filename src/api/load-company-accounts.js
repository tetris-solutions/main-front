import {GET} from '@tetris/http'

export function loadCompanyAccounts (id, config) {
  return GET(`${process.env.TKM_URL}/company/${id}/accounts`, config)
}
