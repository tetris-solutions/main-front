import {PUT} from '@tetris/http'
import validatedUser from '../functions/validate-user'
import merge from 'lodash/merge'

export default (user, config) => validatedUser(user, false)
  .then(() => PUT(`${process.env.USER_API_URL}/me`,
    merge(config, {body: user})))
