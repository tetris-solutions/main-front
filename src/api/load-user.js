import {GET} from '@tetris/http'

/**
 * load user from api
 * @param token
 */
export default token => GET(`${process.env.USER_API_URL}`, {headers: {Authorization: `Bearer ${token}`}})
