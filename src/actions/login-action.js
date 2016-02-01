import login from '../api/login'
import persistTokenAsCookies from '../functions/persist-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'

export default (tree, email, password) =>
  login(email, password, getApiFetchConfig(tree))
    .then(persistTokenAsCookies)
    .then(response => {
      tree.set('user', response.data)
      tree.commit()
    })
