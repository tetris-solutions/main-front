import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import Message from 'tetris-iso/Message'
import {Link} from 'react-router'
import {branch} from 'baobab-react/higher-order'
import {deleteCompanyAccountAction} from '../../actions/delete-company-account-action'
import {loadCompanyAccountsAction} from '../../actions/load-company-accounts-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import FormMixin from '../FormMixin'
import SubmitButton from '../SubmitButton'

export const CompanyAccountRow = createReactClass({
  displayName: 'Company-Account-Row',
  mixins: [FormMixin],
  propTypes: {
    account: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      name: PropTypes.string,
      platform: PropTypes.string,
      external_id: PropTypes.string,
      token_status: PropTypes.string,
      company_account: PropTypes.string
    }),
    company: PropTypes.string,
    dispatch: PropTypes.func
  },
  unlink (e) {
    e.preventDefault()

    const {dispatch, company, account} = this.props

    this.preSubmit()

    return dispatch(deleteCompanyAccountAction, account.company_account)
      .then(() => dispatch(pushSuccessMessageAction))
      .then(() => dispatch(loadCompanyAccountsAction, company))
      .catch(this.posSubmit)
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
          <SubmitButton
            onClick={this.unlink}
            color='red'
            size='xs'
            labelMessage='unlinkAccount'/>
        </td>
      </tr>
    )
  }
})

export default branch({}, CompanyAccountRow)
