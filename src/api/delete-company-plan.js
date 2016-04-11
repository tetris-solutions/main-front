import {DELETE} from '@tetris/http'

export function deleteCompanyPlan (id, config) {
  return DELETE(`${process.env.USER_API_URL}/company_plan/${id}`, config)
}

export default deleteCompanyPlan
