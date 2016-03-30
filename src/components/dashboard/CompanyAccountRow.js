import React from 'react'
import Message from '../intl/Message'
import {Link} from 'react-router'
import {branch} from 'baobab-react/higher-order'
import {deleteCompanyAccountAction} from '../../actions/delete-company-account-action'
import {loadCompanyAccountsAction} from '../../actions/load-company-accounts-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'

const {PropTypes} = React

export const CompanyAccountRow = React.createClass({
  propTypes: {
    account: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      platform: PropTypes.string,
      external_id: PropTypes.string,
      token_status: PropTypes.string,
      company_account: PropTypes.string
    }),
    company: PropTypes.string,
    actions: PropTypes.shape({
      unlinkCompanyAccount: PropTypes.func,
      notifySuccess: PropTypes.func,
      reloadAccounts: PropTypes.func
    })
  },
  unlink (e) {
    e.preventDefault()

    const {
      actions: {
        unlinkCompanyAccount,
        notifySuccess,
        reloadAccounts
      }, company, account
    } = this.props

    return unlinkCompanyAccount(account.company_account)
      .then(() => notifySuccess())
      .then(() => reloadAccounts(company))
  },
  render () {
    const {id, platform, external_id, token_status, name} = this.props.account

    return (
      <tr>
        <td>
          <Link to={`/dashboard/account/${id}`}>
            {external_id}
          </Link>
        </td>
        <td>{name || '--'}</td>
        <td>{platform}</td>
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
        <td className='text-right'>
          <a href='' className='text-danger' onClick={this.unlink}>
            <Message>unlinkAccount</Message>
          </a>
        </td>
      </tr>
    )
  }
})

export default branch(CompanyAccountRow, {
  actions: {
    unlinkCompanyAccount: deleteCompanyAccountAction,
    reloadAccounts: loadCompanyAccountsAction,
    notifySuccess: pushSuccessMessageAction
  }
})
