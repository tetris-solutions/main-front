import React from 'react'
import Message from '../intl/Message'
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
        <p className='text-right'>
          <a className='btn btn-success' href={`${process.env.TKM_URL}/company/${company}/link/adwords`}>
            <Message>linkAdWordsAccount</Message>
          </a>
          &nbsp;
          <a className='btn btn-primary' href={`${process.env.TKM_URL}/company/${company}/link/facebook`}>
            <Message>linkFacebookAccount</Message>
          </a>
        </p>
        <table className='table'>
          <thead>{tableHeaders}</thead>
          <tbody>

          {map(this.props.accounts, (account, index) =>
            <CompanyAccountRow
              key={index}
              account={account}
              company={this.props.params.company}/>)}

          </tbody>
        </table>
      </div>
    )
  }
})

export default branch(CompanyAccounts, {
  cursors (props, context) {
    return {
      accounts: ['companies', props.params.company, 'accounts']
    }
  }
})
