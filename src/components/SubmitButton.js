import React from 'react'
import PropTypes from 'prop-types'
import Message from 'tetris-iso/Message'
import window from 'global/window'

const isServer = typeof document === 'undefined'
const btBlock = {display: 'block', width: '100%'}

export default class extends React.Component {
  static contextTypes = {
    submitInProgress: PropTypes.bool.isRequired
  }

  static propTypes = {
    labelMessage: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string,
    block: PropTypes.bool,
    style: PropTypes.string,
    onClick: PropTypes.func
  }

  static defaultProps = {
    block: false,
    style: 'expand-right',
    color: 'mint',
    size: 's',
    labelMessage: 'callToActionSubmit'
  }

  componentDidMount () {
    if ('Ladda' in window) {
      this.ladda = window.Ladda.create(this.refs.btn)
    }
  }

  componentWillReceiveProps (nextProps, {submitInProgress}) {
    if (submitInProgress === this.context.submitInProgress) return

    if (this.ladda) {
      if (submitInProgress) {
        this.ladda.start()
      } else {
        this.ladda.stop()
      }
    }
  }

  render () {
    const {
      color,
      size,
      style,
      block,
      labelMessage,
      onClick
    } = this.props
    const type = onClick ? 'button' : 'submit'

    return (
      <button
        disabled={isServer}
        type={type}
        name='submitButton'
        ref='btn'
        onClick={onClick}
        className='ladda-button'
        style={block ? btBlock : undefined}
        data-style={style}
        data-color={color}
        data-size={size}>

        <span className='ladda-label'>
          <Message>{labelMessage}</Message>
        </span>

      </button>
    )
  }
}
