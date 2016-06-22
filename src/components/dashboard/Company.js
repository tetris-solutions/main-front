import React from 'react'
import {branch} from 'baobab-react/higher-order'
import {Link} from 'react-router'
import Message from '@tetris/front-server/lib/components/intl/Message'
import cx from 'classnames'

const {PropTypes, cloneElement} = React

export const Company = React.createClass({
  displayName: 'Company',
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
    const companyPath = `/dashboard/company/${params.company}`
    const rolesPath = `${companyPath}/roles`
    const accountsPath = `${companyPath}/accounts`
    const appsPath = `${companyPath}/apps`
    const infoPath = `${companyPath}/info`
    const isIndexRoute = !isActive(rolesPath) && !isActive(accountsPath) && !isActive(appsPath) && !isActive(infoPath)

    return (
      <div>
        <ul className='nav nav-tabs'>
          <li className={cx(isIndexRoute && 'active')}>
            <Link to={companyPath}>
              <Message>companyPlansHeader</Message>
            </Link>
          </li>

          <li className={cx(isActive(appsPath) && 'active')}>
            <Link to={appsPath}>
              <Message>companyAppsHeader</Message>
            </Link>
          </li>

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

          <li className={cx(isActive(infoPath) && 'active')}>
            <Link to={infoPath}>
              <Message>companyInfoHeader</Message>
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

export default branch((props, context) => ({
  company: ['companies', props.params.company]
}), Company)
