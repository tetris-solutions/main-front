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
    children: PropTypes.node.isRequired,
    html: PropTypes.bool
  },
  render () {
    const {FormattedMessage, FormattedHTMLMessage} = global.ReactIntl
    const messageName = this.props.children
    const Component = this.props.html
      ? FormattedHTMLMessage
      : FormattedMessage
    const props = omit(this.props, 'children', 'html')
    const intl = this.context

    return (
      <Component {...props}
        message={intl.messages[messageName]}
        locales={intl.locales}
        messages={intl.messages}/>
    )
  }
})