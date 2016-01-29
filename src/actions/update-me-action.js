import updateMe from '../api/update-me'
import persistTokenAsCookies from '../functions/persist-token-as-cookie'

export default (tree, user) => updateMe(user)
  .then(persistTokenAsCookies)
  .then(response => {
    tree.merge('user', response.data)
    tree.commit()
  })
