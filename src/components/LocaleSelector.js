import React from 'react'
import PropTypes from 'prop-types'
import {changeLocaleAction} from 'tetris-iso/actions'
import {branch} from 'baobab-react/higher-order'

export class LocaleSelector extends React.Component {
  static displayName = 'Locale-Selector'

  static propTypes = {
    className: PropTypes.string,
    userLocale: PropTypes.string,
    locale: PropTypes.string,
    dispatch: PropTypes.func
  }

  static defaultProps = {
    className: 'form-control'
  }

  onChangeLocale = ({target: {value}}) => {
    this.props.dispatch(changeLocaleAction, value)
  }

  render () {
    return (
      <select
        ref='select'
        className={this.props.className}
        value={this.props.locale || this.props.userLocale}
        onChange={this.onChangeLocale}>

        <option value='en'>English</option>
        <option value='pt-BR'>Português</option>

      </select>
    )
  }
}

export default branch({
  userLocale: ['user', 'locale'],
  locale: ['locale']
}, LocaleSelector)
