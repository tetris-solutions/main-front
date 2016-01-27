import login from '../api/login'
import loadUser from '../api/load-user'

export default (tree, email, password) =>
  login(email, password)
    .then(loadUser)
    .then(user => {
      tree.set('user', user)
    })
