import React from 'react'
import Message from 'tetris-iso/Message'
import CompanyAccountRow from './CompanyAccountRow'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'

const {PropTypes} = React

export const CompanyAccounts = React.createClass({
  displayName: 'Company-Accounts',
  propTypes: {
    accounts: PropTypes.array,
    params: PropTypes.object
  },
  render () {
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
            &nbsp;
            <a className='btn btn-default' href={`${process.env.TKM_URL}/company/${company}/link/analytics`}>
              Google Analytics
            </a>
            &nbsp;
            <a className='btn btn-warning' href={`${process.env.TKM_URL}/company/${company}/link/doubleclick`}>
              Double Click
            </a>
            &nbsp;
            <a className='btn btn-primary' href={`${process.env.TKM_URL}/company/${company}/link/facebook`}>
              Facebook
            </a>
            &nbsp;
            <a className='btn btn-info' href={`${process.env.TKM_URL}/company/${company}/link/twitter`}>
              Twitter
            </a>
          </div>
        </section>
      </div>
    )
  }
})

export default branch((props, context) => ({
  accounts: ['companies', props.params.company, 'accounts']
}), CompanyAccounts)
