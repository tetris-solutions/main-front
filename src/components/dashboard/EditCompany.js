import React from 'react'
import {branch} from 'baobab-react/higher-order'
import {Link} from 'react-router'
import Message from './../intl/Message'
import cx from 'classnames'

const {PropTypes, cloneElement} = React

export const EditCompany = React.createClass({
  displayName: 'Edit-Company',
  propTypes: {
    company: PropTypes.object,
    params: PropTypes.object,
    children: PropTypes.node
  },
  contextTypes: {
    router: PropTypes.object
  },
  render () {
    const {company, children, params} = this.props
    const {router: {isActive}} = this.context
    const rolesPath = `/dashboard/companies/${params.company}/roles`
    const accountsPath = `/dashboard/companies/${params.company}/accounts`

    return (
      <div>
        <ul className='nav nav-tabs'>

          <li className={cx(isActive(rolesPath) && 'active')}>
            <Link to={rolesPath}>
              <Message>roleListHeader</Message>
            </Link>
          </li>

          <li className={cx(isActive(accountsPath) && 'active')}>
            <Link to={accountsPath}>
              <Message>accountListHeader</Message>
            </Link>
          </li>

        </ul>
        <div className='tab-content'>
          <br/>
          {children && cloneElement(children, {company})}
        </div>
      </div>
    )
  }
})

export default branch(EditCompany, {
  cursors (props, context) {
    return {
      company: ['companies', props.params.company]
    }
  }
})
