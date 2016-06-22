import {PUT} from '@tetris/http'
import assign from 'lodash/assign'

export function updateCompany (id, changes, config) {
  return PUT(`${process.env.USER_API_URL}/company/${id}`, assign({
    body: changes
  }, config))
}
