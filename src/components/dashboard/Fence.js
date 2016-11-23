import React from 'react'
import NoTrespassing from './NoTrespassing'
import diff from 'lodash/difference'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import isFunction from 'lodash/isFunction'
import includes from 'lodash/includes'
import keys from 'lodash/keys'
import invert from 'lodash/invert'
import compact from 'lodash/compact'

const permissionNames = {
  canEditRole: 'EditRole',
  canEditCompany: 'EditCompany',
  canManageTokens: 'ManageTokens'
}
const permissionAliases = invert(permissionNames)
const getPermissionName = id => permissionNames[id]

const {PropTypes} = React
const none = []
const passengerType = PropTypes.oneOfType([
  PropTypes.func,
  PropTypes.node
]).isRequired

function Gate ({passenger, permissions}) {
  if (isFunction(passenger)) {
    return passenger(permissions)
  }

  return permissions.allow
    ? passenger
    : null
}

Gate.displayName = 'Gate'
Gate.propTypes = {
  passenger: passengerType,
  permissions: PropTypes.shape({
    allow: PropTypes.bool.isRequired,
    granted: PropTypes.array.isRequired,
    required: PropTypes.array.isRequired
  }).isRequired
}

const Fence = React.createClass({
  displayName: 'Fence',
  contextTypes: {
    permissions: PropTypes.array.isRequired,
    tree: PropTypes.object.isRequired
  },
  propTypes: {
    children: passengerType,
    canEditRole: PropTypes.bool,
    canEditCompany: PropTypes.bool,
    canManageTokens: PropTypes.bool
  },
  render () {
    const {tree, permissions: userPerms} = this.context
    const isAdmin = Boolean(tree.get(['user', 'is_admin']))

    const required = compact(map(keys(this.props), getPermissionName))
    const granted = map(userPerms || none, 'id')

    const missing = isAdmin
      ? []
      : diff(required, granted)

    const allow = isAdmin || isEmpty(missing)
    const permissions = {allow, missing, granted, required}

    for (let i = 0; i < required.length; i++) {
      const name = required[i]
      const alias = permissionAliases[name]

      permissions[alias] = isAdmin || includes(granted, name)
    }

    return <Gate passenger={this.props.children} permissions={permissions}/>
  }
})

export function restrict (Component, ...permissions) {
  const requiredPerms = {}

  for (let i = 0; i < permissions.length; i++) {
    requiredPerms[permissions[i]] = true
  }

  function ProtectedArea (props) {
    return (
      <Fence {...requiredPerms}>
        {f => f.allow
          ? <Component {...props}/>
          : <NoTrespassing/>}
      </Fence>
    )
  }

  ProtectedArea.displayName = 'Protected-Area'

  return ProtectedArea
}

restrict.canEditRole = 'canEditRole'
restrict.canEditCompany = 'canEditCompany'
restrict.canManageTokens = 'canManageTokens'

export default Fence
