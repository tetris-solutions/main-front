import React from 'react'
import pick from 'lodash/pick'
import cx from 'classnames'

const {PropTypes} = React
const inputFields = [
  'name',
  'type',
  'onChange',
  'required',
  'defaultValue',
  'value'
]

export default React.createClass({
  displayName: 'SimpleInput',
  getDefaultProps () {
    return {
      type: 'text'
    }
  },
  propTypes: {
    type: PropTypes.string,
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    onChange: PropTypes.func
  },
  render () {
    const {error, label} = this.props
    return (
      <div className={cx('form-group', error && 'has-error')}>
        <label className='control-label'>{label}</label>
        <input className='form-control' {...pick(this.props, inputFields)}/>
        {error && (<p className='help-block'>{error}</p>)}
      </div>
    )
  }
})