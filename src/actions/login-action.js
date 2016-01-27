import login from '../api/login'
import persistTokenAsCookies from '../functions/persist-token-as-cookie'

export default (tree, email, password) =>
  login(email, password)
    .then(persistTokenAsCookies)
    .then(response => {
      tree.set('user', response.data)
      tree.commit()
    })
