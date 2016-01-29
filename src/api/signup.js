import {POST} from '@tetris/http'
import passValidatedUser from '../functions/pass-validated-user'
import includeToken from '../functions/include-token'

export default passValidatedUser(user => POST(`${process.env.USER_API_URL}/user`, includeToken({body: user})))
