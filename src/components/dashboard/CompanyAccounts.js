import React from 'react'
import Message from '../intl/Message'
import {branch} from 'baobab-react/higher-order'
import map from 'lodash/map'

const {PropTypes} = React

export const CompanyAccounts = React.createClass({
  propTypes: {
    accounts: PropTypes.array,
    params: PropTypes.object
  },
  render () {
    const {accounts} = this.props
    return (
      <table className='table'>
        <thead>
          <tr>
            <th><Message>accountNameHeader</Message></th>
            <th><Message>accountPlatformHeader</Message></th>
            <th><Message>accountExternalIdHeader</Message></th>
            <th><Message>accountTokenStatusHeader</Message></th>
          </tr>
        </thead>
        <tbody>
        {map(accounts, ({id, platform, external_id, token_status, name}, index) => (
          <tr key={index}>
            <td>{name || '--'}</td>
            <td>{platform}</td>
            <td>{external_id}</td>
            <td>
              {token_status === 'ok' && (
                <span className='text-success'>
                  <Message>okTokenLabel</Message>
                </span>
              )}
              {token_status === 'invalid' && (
                <span className='text-danger'>
                  <Message>invalidTokenLabel</Message>
                </span>
              )}
              {token_status === 'unknown' && (
                <span className='text-warning'>
                  <Message>unknownTokenStatusLabel</Message>
                </span>
              )}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
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
