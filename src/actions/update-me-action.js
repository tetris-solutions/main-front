import updateMe from '../api/update-me'
import persistTokenAsCookies from '../functions/persist-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'

export default (tree, user) => updateMe(user)
  .then(persistTokenAsCookies, getApiFetchConfig(tree))
  .then(response => {
    tree.merge('user', response.data)
    tree.commit()
  })
