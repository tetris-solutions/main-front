import {loadRoleUsers} from '../api/load-role-users'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'
import findIndex from 'lodash/findIndex'

/**
 * loads a list of users in a role saving it in `tree.companies[company].roles[roleIndex].users`
 * @param {Baobab} tree state tree
 * @param {String} company company id
 * @param {String} role role id
 * @param {String} [token] auth token
 * @returns {Promise} promise that resolves once action is complete
 */
export function loadRoleUsersAction (tree, company, role, token) {
  return loadRoleUsers(role, getApiFetchConfig(tree, token))
    .then(saveResponseTokenAsCookie)
    .then(response => {
      const rolesCursor = tree.select('companies', company, 'roles')
      const roleIndex = findIndex(rolesCursor.get(), {id: role})

      rolesCursor.set([roleIndex, 'users'], response.data)
      tree.commit()
    })
}

/**
 * adaptor to call `loadRoleUsersActionServerAdaptor` on the server side
 * @param {Object} req express request
 * @param {Object} res express response
 * @returns {Promise} action promise
 */
export function loadRoleUsersActionServerAdaptor (req, res) {
  const {company, role} = req.params
  return loadRoleUsersAction(res.locals.tree, company, role, req.authToken)
}

/**
 * adaptor to call `loadRoleUsersAction` as an `onEnter` hook
 * @param {Object} state history state
 * @param {Baobab} tree state tree
 * @returns {Promise} promise action
 */
export function loadRoleUsersActionRouteAdaptor (state, tree) {
  const {company, role} = state.params
  return loadRoleUsersAction(tree, company, role)
}

export default loadRoleUsersAction
