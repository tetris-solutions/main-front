import React from 'react'
import PropTypes from 'prop-types'
import pick from 'lodash/pick'
import cx from 'classnames'
import Message from 'tetris-iso/Message'

const inputFields = [
  'name',
  'disabled',
  'readOnly',
  'type',
  'onChange',
  'required',
  'defaultValue',
  'placeholder',
  'value'
]

export class SimpleInput extends React.Component {
  static displayName = 'SimpleInput'

  static defaultProps = {
    type: 'text'
  }

  static propTypes = {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func,
    className: PropTypes.string
  }

  render () {
    const {error, label, className} = this.props
    return (
      <div className={cx('form-group', error && 'has-error')}>
        {label && (
          <label className='control-label'>
            <Message>{label + 'Label'}</Message>
          </label>
        )}
        <input className={cx('form-control', className)} {...pick(this.props, inputFields)}/>
        {error && (<p className='help-block'>{error}</p>)}
      </div>
    )
  }
}

export default SimpleInput
