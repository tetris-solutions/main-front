import signup from '../api/signup'
import getApiFetchConfig from '../functions/get-api-fetch-config'

export default (tree, user) => signup(user, getApiFetchConfig(tree))
