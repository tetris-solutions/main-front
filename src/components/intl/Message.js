import React from 'react'
import global from 'global'
import omit from 'lodash/omit'

const {PropTypes} = React

export default React.createClass({
  displayName: 'Message',
  contextTypes: {
    locales: PropTypes.string,
    messages: PropTypes.object
  },
  propTypes: {
    children: PropTypes.node.isRequired
  },
  render () {
    const {FormattedMessage} = global.ReactIntl
    const messageName = this.props.children
    const props = omit(this.props, 'children')
    const intl = this.context

    return (
      <FormattedMessage {...props}
        message={intl.messages[messageName]}
        locales={intl.locales}
        messages={intl.messages}/>
    )
  }
})