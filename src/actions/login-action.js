import login from '../api/login'
import loadUser from '../api/load-user'
import persistTokenAsCookies from '../functions/persist-token-as-cookie'

export default (tree, email, password) =>
  login(email, password)
    .then(persistTokenAsCookies)
    .then(() => loadUser())
    .then(user => {
      tree.set('user', user)
    })
