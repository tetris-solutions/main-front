import {DELETE} from '@tetris/http'

export function deleteCompanyAccount (id, config) {
  return DELETE(`${process.env.TKM_URL}/company_account/${id}`, config)
}

export default deleteCompanyAccount
