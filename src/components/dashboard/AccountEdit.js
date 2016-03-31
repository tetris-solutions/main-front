import React from 'react'
import {branch} from 'baobab-react/higher-order'
import toUpper from 'lodash/toUpper'
import Message from '../intl/Message'

const {PropTypes} = React

export const AccountEdit = React.createClass({
  propTypes: {
    account: PropTypes.object
  },
  contextTypes: {
    moment: PropTypes.func.isRequired
  },
  removeAccount (e) {
    e.preventDefault()
    // @todo: call action; etc
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
            <dd>{moment(token_timestamp).fromNow()}</dd>
            <dt>
              <Message>accessTokenExpiration</Message>
            </dt>
            <dd>
              {token_expiration
                ? moment(token_expiration).fromNow()
                : '--'}
            </dd>
          </dl>

          <p className='well' style={{wordWrap: 'break-word'}}>
            {token}
          </p>
        </session>
      )
    }

    return (
      <div className='panel panel-default'>
        <div className='panel-heading'>
          {toUpper(platform)} :: {name || external_id}
        </div>
        <div className='panel-body'>
          <div className='row'>
            <div className='col-sm-6'>
              <h4>
                <Message>accountInformationHeader</Message>
              </h4>
              <dl>
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
          <a className='btn btn-warning' onClick={this.removeAccount}>
            <Message>removeAccount</Message>
          </a>
        </div>
      </div>
    )
  }
})

export default branch(AccountEdit, {
  cursors (props, context) {
    return {
      account: ['accounts', props.params.account]
    }
  }
})
