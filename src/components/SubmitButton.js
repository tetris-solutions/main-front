import React from 'react'

const {PropTypes} = React

export default React.createClass({
  contextTypes: {
    submitInProgress: PropTypes.bool.isRequired
  },
  componentDidMount () {
    this.ladda = window.Ladda.create(this.refs.btn)
  },
  componentWillReceiveProps (nextProps, {submitInProgress}) {
    if (submitInProgress === this.context.submitInProgress) return

    if (submitInProgress) {
      this.ladda.start()
    } else {
      this.ladda.stop()
    }
  },
  render () {
    const {submitInProgress} = this.context
    return (
      <button type='submit'
              ref='btn'
              className='ladda-button'
              data-style='expand-right'
              data-color='mint'
              data-size='s'>
        <span className='ladda-label'>Salvar</span>
      </button>
    )
  }
})
