import React from 'react'
import PropTypes from 'prop-types'
import Message from 'tetris-iso/Message'
import CompanyAccountRow from './CompanyAccountRow'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'

export class CompanyAccounts extends React.Component {
  static displayName = 'Company-Accounts'

  static propTypes = {
    accounts: PropTypes.array,
    params: PropTypes.object
  }

  static contextTypes = {
    location: PropTypes.object.isRequired
  }

  render () {
    const {location} = this.context
    const {params: {company}} = this.props

    const tableHeaders = (
      <tr>
        <th><Message>accountExternalIdHeader</Message></th>
        <th><Message>accountNameHeader</Message></th>
        <th><Message>accountPlatformHeader</Message></th>
        <th><Message>accountTokenStatusHeader</Message></th>
        <th/>
      </tr>
    )

    const here = process.env.FRONT_URL + location.pathname

    return (
      <div>
        <br/>
        <table className='table'>
          <thead>{tableHeaders}</thead>
          <tbody>

            {map(this.props.accounts, (account, index) =>
              <CompanyAccountRow
                key={account.id}
                account={account}
                company={this.props.params.company}/>)}

          </tbody>
        </table>

        <br/>
        <section className='text-right'>
          <h4>
            <Message>linkAccount</Message>
          </h4>
          <div className='btn-group'>
            <a className='btn btn-success' href={`${process.env.TKM_URL}/company/${company}/link/adwords`}>
              Adwords
            </a>
            <a className='btn btn-default' href={`${process.env.TKM_URL}/company/${company}/link/analytics`}>
              Google Analytics
            </a>
            <a className='btn btn-warning' href={`${process.env.TKM_URL}/company/${company}/link/doubleclick`}>
              Double Click
            </a>
            <a className='btn btn-primary' href={`${process.env.TKM_URL}/company/${company}/link/facebook`}>
              Facebook
            </a>
            <a className='btn btn-info' href={`${process.env.TKM_URL}/company/${company}/link/twitter`}>
              Twitter
            </a>
            <a className='btn btn-success' href={`${process.env.TKM_URL}/account/vtex/?company=${company}&next=${here}`}>
              VTEX
            </a>
            <a className='btn btn-default' href={`${process.env.TKM_URL}/company/${company}/link/linkedin`}>
              Linkedin
            </a>
            <a className='btn btn-warning' href={`${process.env.TKM_URL}/company/${company}/link/microsoft`}>
              Microsoft
            </a>
            <a className='btn btn-primary' href={`${process.env.TKM_URL}/account/criteo/?company=${company}&next=${here}`}>
              Criteo
            </a>
          </div>
        </section>
      </div>
    )
  }
}

export default branch((props, context) => ({
  accounts: ['companies', props.params.company, 'accounts']
}), CompanyAccounts)
