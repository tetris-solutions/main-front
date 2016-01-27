import {GET} from '@tetris/http'

export default () => GET(`${process.env.USER_API_URL}`)
