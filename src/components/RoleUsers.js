import React from 'react'

const {PropTypes} = React

export const RoleUsers = React.createClass({
  displayName: 'Role-Users',
  propTypes: {
    role: PropTypes.object
  },
  render () {
    return (
      <div>
        List of users in role {this.props.role.name}
        <hr/>
      </div>
    )
  }
})

export default RoleUsers
