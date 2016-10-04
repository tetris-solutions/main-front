import React from 'react'
import find from 'lodash/find'
import {Link} from 'react-router'
import Message from '@tetris/front-server/lib/components/intl/Message'
import cx from 'classnames'

const {PropTypes, cloneElement} = React

export const CompanyRole = React.createClass({
  displayName: 'Company-Role',
  propTypes: {
    params: PropTypes.object,
    children: PropTypes.node,
    company: PropTypes.object
  },
  contextTypes: {
    router: PropTypes.object
  },
  render () {
    const {params, children, company} = this.props
    const {router: {isActive}} = this.context
    const optionsPath = `/dashboard/company/${params.company}/roles/${params.role}`
    const usersPath = `/dashboard/company/${params.company}/roles/${params.role}/users`
    const isUsers = isActive(usersPath)
    const role = find(company.roles, {id: params.role})

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
              <Message>navRoleMembers</Message>
            </Link>
          </li>
        </ul>
        <div className='tab-content'>
          <div className='tab-pane active'>
            {cloneElement(children, {role, company})}
          </div>
        </div>
      </div>
    )
  }
})

export default CompanyRole
