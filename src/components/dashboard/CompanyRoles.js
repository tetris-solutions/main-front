import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router'
import Message from 'tetris-iso/Message'
import cx from 'classnames'

const {
  cloneElement
} = React

export class CompanyRoles extends React.Component {
  static displayName = 'Company-Roles'

  static propTypes = {
    company: PropTypes.object,
    params: PropTypes.object,
    children: PropTypes.node
  }

  render () {
    const {company, children, params} = this.props
    return (
      <div className='row'>
        <div className='col-sm-3'>
          <ul className='nav nav-pills nav-stacked'>
            {company.roles.map(({id, name}, index) => (
              <li key={index} className={cx(params.role === id && 'active')}>
                <Link to={`/dashboard/company/${params.company}/roles/${id}`}>
                  {name}
                </Link>
              </li>
            ))}
            <li className={cx(!params.role && 'active')}>
              <Link to={`/dashboard/company/${params.company}/roles`}>
                <Message>newRoleHeader</Message>
              </Link>
            </li>
          </ul>
        </div>
        <div className='col-sm-9'>
          <div className='tab-content'>
            <div className='tab-pane active'>
              {cloneElement(children, {company})}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default CompanyRoles
