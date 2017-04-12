import React from 'react'
import PropTypes from 'prop-types'
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

class Fence extends React.Component {
  static displayName = 'Fence'

  static contextTypes = {
    permissions: PropTypes.array,
    tree: PropTypes.object.isRequired
  }

  static propTypes = {
    children: passengerType,
    adminOnly: PropTypes.bool,
    canEditRole: PropTypes.bool,
    canEditCompany: PropTypes.bool,
    canManageTokens: PropTypes.bool
  }

  permissionCheck = (userPerms, isAdmin) => {
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

    return permissions
  }

  render () {
    const {tree, permissions: userPerms} = this.context
    const isAdmin = Boolean(tree.get(['user', 'is_admin']))
    let permissions

    if (this.props.adminOnly) {
      permissions = {allow: isAdmin, missing: [], granted: [], required: []}
    } else {
      permissions = this.permissionCheck(userPerms, isAdmin)
    }

    return <Gate passenger={this.props.children} permissions={permissions}/>
  }
}

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
restrict.adminOnly = 'adminOnly'

export default Fence
