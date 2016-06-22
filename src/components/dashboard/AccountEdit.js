import React from 'react'
import {branch} from 'baobab-react/higher-order'
import toUpper from 'lodash/toUpper'
import Message from '@tetris/front-server/lib/components/intl/Message'
import {deleteAccountAction} from '../../actions/delete-account-action'
import {pushSuccessMessageAction} from '../../actions/push-success-message-action'
import FormMixin from '@tetris/front-server/lib/mixins/FormMixin'
import SubmitButton from '@tetris/front-server/lib/components/SubmitButton'

const {PropTypes} = React

function getIssuedAtFromToken (token) {
  if (!token) return null

  const {issued_at, created} = token

  if (!created && !issued_at) return null

  return created
    ? Number(created) * 1000
    : issued_at
}
function AccountToken ({
  account: {
    token,
    token_expiration,
    token_timestamp
  }
}, {moment}) {
  const issuedAt = getIssuedAtFromToken(token) || token_timestamp

  return (
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

AccountToken.displayName = 'Account-Token'
AccountToken.contextTypes = {
  moment: PropTypes.func
}
AccountToken.propTypes = {
  account: PropTypes.object
}

export const AccountEdit = React.createClass({
  mixins: [FormMixin],
  displayName: 'Account-Edit',
  propTypes: {
    account: PropTypes.object,
    dispatch: PropTypes.func
  },
  contextTypes: {

    router: PropTypes.object
  },
  removeAccount (e) {
    e.preventDefault()

    this.preSubmit()

    const {dispatch, account} = this.props

    return dispatch(deleteAccountAction, account.id)
      .then(() => dispatch(pushSuccessMessageAction))
      .then(() => {
        this.context.router.goBack()
      })
      .catch(this.posSubmit)
  },
  render () {
    const {
      id,
      platform,
      name,
      token,
      external_id
    } = this.props.account

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
              {token && <AccountToken {...this.props}/>}
            </div>
          </div>

          <hr/>
          <p>
            <SubmitButton color='red' labelMessage='removeAccount'/>

            <a
              className='ladda-button pull-right'
              data-size='s'
              data-color='mint'
              href={`${process.env.TKM_URL}/account/${id}/login/${platform}`}>

              <span className='ladda-label'>
                <Message>refreshToken</Message>
              </span>

            </a>
          </p>
        </form>
      </div>
    )
  }
})

export default branch((props, context) => ({
  account: ['accounts', props.params.account]
}), AccountEdit)
