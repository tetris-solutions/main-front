import {PUT} from '@tetris/http'
import passValidatedUser from '../functions/pass-validated-user'
import includeToken from '../functions/include-token'

const onValidate = user => PUT(`${process.env.USER_API_URL}/me`, includeToken({body: user}))
onValidate.requiresPassword = false
export default passValidatedUser(onValidate)
