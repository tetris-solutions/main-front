import {POST} from '@tetris/http'
import validatedUser from '../functions/validate-user'
import merge from 'lodash/merge'

export default (user, config) => validatedUser(user)
  .then(() => POST(`${process.env.USER_API_URL}/user`,
    merge(config, {body: user})))
