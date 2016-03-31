import React from 'react'
import {branch} from 'baobab-react/higher-order'
import toUpper from 'lodash/toUpper'
import Message from '../intl/Message'
import {deleteAccountAction} from '../../actions/delete-account-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import FormMixin from '../../mixins/FormMixin'
import SubmitButton from './../SubmitButton'
import get from 'lodash/get'

const {PropTypes} = React

export const AccountEdit = React.createClass({
  mixins: [FormMixin],
  propTypes: {
    account: PropTypes.object,
    actions: PropTypes.shape({
      notifySuccess: PropTypes.func,
      removeAccount: PropTypes.func
    })
  },
  contextTypes: {
    moment: PropTypes.func,
    router: PropTypes.object
  },
  removeAccount (e) {
    e.preventDefault()

    this.preSubmit()

    const {account, actions: {notifySuccess, removeAccount}} = this.props

    return removeAccount(account.id)
      .then(() => notifySuccess())
      .then(() => this.context.router.push('/dashboard'))
      .catch(this.posSubmit)
  },
  render () {
    const {
      platform,
      name,
      token,
      token_expiration,
      token_timestamp,
      external_id
    } = this.props.account

    const {moment} = this.context

    let tokenSession = null
    const issuedAt = get(token, 'issuedAt') || token_timestamp

    if (token) {
      tokenSession = (
        <session>
          <h4>
            <Message>accessTokenHeader</Message>
          </h4>

          <dl>
            <dt>
              <Message>accessTokenTimestamp</Message>
            </dt>
            <dd>{moment(issuedAt).fromNow()}</dd>
            <dt>
              <Message>accessTokenExpiration</Message>
            </dt>
            <dd>
              {token_expiration
                ? moment(token_expiration).fromNow()
                : '--'}
            </dd>
          </dl>

          <pre className='well' style={{wordWrap: 'break-word'}}>
            {JSON.stringify(token, null, 2)}
          </pre>
        </session>
      )
    }

    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          {toUpper(platform)} :: {name || external_id}
        </div>
        <form className='panel-body' onSubmit={this.removeAccount}>
          <div className='row'>
            <div className='col-sm-6'>
              <h4>
                <Message>accountInformationHeader</Message>
              </h4>
              <dl>

                <dt><Message>accountPlatformHeader</Message></dt>
                <dd>{platform}</dd>

                {name && (
                  <dt>
                    <Message>accountNameHeader</Message>
                  </dt>)}

                {name && <dd>{name}</dd>}

                <dt>
                  <Message>accountExternalIdHeader</Message>
                </dt>
                <dd>{external_id}</dd>
              </dl>
            </div>
            <div className='col-sm-6'>
              {tokenSession}
            </div>
          </div>

          <hr/>
          <p className='text-right'>
            <SubmitButton color='red' labelMessage='removeAccount'/>
          </p>
        </form>
      </div>
    )
  }
})

export default branch(AccountEdit, {
  cursors (props, context) {
    return {
      account: ['accounts', props.params.account]
    }
  },
  actions: {
    removeAccount: deleteAccountAction,
    notifySuccess: pushSuccessMessageAction
  }
})
