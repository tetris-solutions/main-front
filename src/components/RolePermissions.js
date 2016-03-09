import React from 'react'
import map from 'lodash/map'

const {PropTypes} = React

export const RolePermissions = React.createClass({
  displayName: 'Role-Permissions',
  contextTypes: {
    role: PropTypes.object
  },
  render () {
    return (
      <div>
        {map(this.context.role.permissions, ({id, name}, index) => (
          <div className='checkbox' key={index}>
            <label>
              <input name={id}
                     type='checkbox'
                     defaultChecked/> {name}
            </label>
          </div>
        ))}
      </div>
    )
  }
})

export default RolePermissions
