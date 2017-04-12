import React from 'react'
import PropTypes from 'prop-types'
import {branch} from 'baobab-react/higher-order'
import {Link} from 'react-router'
import Message from 'tetris-iso/Message'
import cx from 'classnames'
import findIndex from 'lodash/findIndex'
import Fence from './Fence'

const {
  cloneElement
} = React

export class Company extends React.Component {
  static displayName = 'Company'

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired,
    company: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired,
    permissions: PropTypes.array.isRequired
  }

  static contextTypes = {
    router: PropTypes.object
  }

  static childContextTypes = {
    permissions: PropTypes.array
  }

  getChildContext () {
    return {
      permissions: this.props.permissions
    }
  }

  componentDidMount () {
    const {location: {pathname}, params: {company}} = this.props
    const baseUrl = `/dashboard/company/${company}`

    if (pathname === baseUrl) {
      this.context.router.push(`${baseUrl}/info`)
    }
  }

  render () {
    const {company, children, params} = this.props
    const {router: {isActive}} = this.context
    const companyPath = `/dashboard/company/${params.company}`

    const rolesPath = `${companyPath}/roles`
    const accountsPath = `${companyPath}/accounts`
    const appsPath = `${companyPath}/apps`
    const infoPath = `${companyPath}/info`
    const plansPath = `${companyPath}/plans`

    return (
      <div>
        <div className='page-header'>
          <h3>{company.name}</h3>
        </div>

        <ul className='nav nav-tabs'>
          <li className={cx(isActive(infoPath) && 'active')}>
            <Link to={infoPath}>
              <Message>companyInfoHeader</Message>
            </Link>
          </li>

          <li className={cx(isActive(appsPath) && 'active')}>
            <Link to={appsPath}>
              <Message>companyAppsHeader</Message>
            </Link>
          </li>

          <Fence canEditRole>
            <li className={cx(isActive(rolesPath) && 'active')}>
              <Link to={rolesPath}>
                <Message>roleListHeader</Message>
              </Link>
            </li>
          </Fence>

          <Fence canManageTokens>
            <li className={cx(isActive(accountsPath) && 'active')}>
              <Link to={accountsPath}>
                <Message>accountListHeader</Message>
              </Link>
            </li>
          </Fence>

          <Fence canEditCompany>
            <li className={cx(isActive(plansPath) && 'active')}>
              <Link to={plansPath}>
                <Message>companyPlansHeader</Message>
              </Link>
            </li>
          </Fence>
        </ul>
        <div className='tab-content'>
          <br/>
          {children && cloneElement(children, {company})}
        </div>
      </div>
    )
  }
}

export default branch((props, context) => ({
  company: ['companies', props.params.company],
  permissions: ['user', 'companies', findIndex(context.tree.get(['user', 'companies']), {id: props.params.company}), 'permissions']
}), Company)
