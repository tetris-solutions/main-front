import React from 'react'
import map from 'lodash/map'
import {branch} from 'baobab-react/higher-order'
import find from 'lodash/find'

const {PropTypes} = React

export const RoleOptions = React.createClass({
  displayName: 'Role-Options',
  contextTypes: {
    role: PropTypes.object
  },
  propTypes: {
    permissions: PropTypes.array
  },
  render () {
    const rolePermissions = this.context.role.permissions

    return (
      <div>
        {map(this.props.permissions, ({id, name}, index) => (
          <div className='checkbox' key={index}>
            <label>
              <input
                name={id}
                type='checkbox'
                defaultChecked={find(rolePermissions, {id})}/> {name}
            </label>
          </div>
        ))}
      </div>
    )
  }
})

export default branch(RoleOptions, {
  cursors: {
    permissions: ['permissions']
  }
})
