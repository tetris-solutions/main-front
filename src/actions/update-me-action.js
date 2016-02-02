import updateMe from '../api/update-me'
import persistTokenAsCookies from '../functions/persist-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'

export default (tree, user) => updateMe(user, getApiFetchConfig(tree))
  .then(persistTokenAsCookies)
  .then(response => {
    tree.merge('user', response.data)
    tree.commit()
  })
