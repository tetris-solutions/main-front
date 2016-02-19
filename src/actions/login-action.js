import login from '../api/login'
import persistTokenAsCookie from '../functions/persist-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'

/**
 * fires request to login API and save user object in the state tree on success
 * @param {Baobab} tree state tree
 * @param {string} email user email
 * @param {string} password user password
 * @returns {Promise} promise that resolves once action is complete
 */
function loginAction (tree, email, password) {
  return login(email, password, getApiFetchConfig(tree))
    .then(persistTokenAsCookie)
    .then(response => {
      tree.set('user', response.data)
      tree.commit()
    })
}

export default loginAction
