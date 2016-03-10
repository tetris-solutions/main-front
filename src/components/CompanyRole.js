import React from 'react'
import find from 'lodash/find'
import {Link} from 'react-router'
import Message from './intl/Message'
import cx from 'classnames'

const {PropTypes} = React

export const CompanyRole = React.createClass({
  displayName: 'Company-Role',
  propTypes: {
    params: PropTypes.object,
    children: PropTypes.node
  },
  contextTypes: {
    company: PropTypes.object,
    router: PropTypes.object
  },
  childContextTypes: {
    role: PropTypes.object
  },
  getRole () {
    return find(this.context.company.roles, {id: this.props.params.role})
  },
  getChildContext () {
    return {
      role: this.getRole()
    }
  },
  render () {
    const {params, children} = this.props
    const {router: {isActive}} = this.context
    const optionsPath = `/admin/${params.company}/${params.role}`
    const usersPath = `/admin/${params.company}/${params.role}/users`
    const isUsers = isActive(usersPath)

    return (
      <div>
        <ul className='nav nav-tabs'>
          <li className={cx(!isUsers && 'active')}>
            <Link to={optionsPath}>
              <Message>navRoleOptions</Message>
            </Link>
          </li>
          <li className={cx(isUsers && 'active')}>
            <Link to={usersPath}>
              <Message>navRoleUsers</Message>
            </Link>
          </li>
        </ul>
        <div className='tab-content'>
          <div className='tab-pane active'>
            {children}
          </div>
        </div>
      </div>
    )
  }
})

export default CompanyRole
