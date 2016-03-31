import React from 'react'
import Message from './intl/Message'
import window from 'global/window'

const {PropTypes} = React

export default React.createClass({
  contextTypes: {
    submitInProgress: PropTypes.bool.isRequired
  },
  propTypes: {
    label: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.string
  },
  getDefaultProps () {
    return {
      color: 'mint',
      size: 's',
      label: 'callToActionSubmit'
    }
  },
  componentDidMount () {
    if ('Ladda' in window) {
      this.ladda = window.Ladda.create(this.refs.btn)
    }
  },
  componentWillReceiveProps (nextProps, {submitInProgress}) {
    if (submitInProgress === this.context.submitInProgress) return

    if (this.ladda) {
      if (submitInProgress) {
        this.ladda.start()
      } else {
        this.ladda.stop()
      }
    }
  },
  render () {
    const {
      color,
      size,
      label
    } = this.props
    return (
      <button
        type='submit'
        name='submitButton'
        ref='btn'
        className='ladda-button'
        data-style='expand-right'
        data-color={color}
        data-size={size}>

        <span className='ladda-label'>
          <Message>{label}</Message>
        </span>

      </button>
    )
  }
})
