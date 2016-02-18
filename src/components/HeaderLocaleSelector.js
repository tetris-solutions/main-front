import React from 'react'
import changeLocaleAction from '../actions/change-locale-action'
import {branch} from 'baobab-react/higher-order'
import window from 'global/window'

const {PropTypes} = React

export const HeaderLocaleSelector = React.createClass({
  displayName: 'Locale-Selector',
  propTypes: {
    userLocale: PropTypes.string,
    locale: PropTypes.string,
    actions: PropTypes.shape({
      changeLocale: PropTypes.func
    })
  },
  onChangeLocale ({target: {value}}) {
    this.props.actions.changeLocale(value)
    window.tetrisLoadLocale(value)
  },
  render () {
    return (
      <form className='navbar-form navbar-right'>
        <div className='form-group'>
          <select className='form-control'
                  value={this.props.locale || this.props.userLocale}
                  onChange={this.onChangeLocale}>

            <option value='en'>English</option>
            <option value='pt-BR'>Português</option>

          </select>
        </div>
      </form>
    )
  }
})

export default branch(HeaderLocaleSelector, {
  cursors: {
    userLocale: ['user', 'locale'],
    locale: ['locale']
  },
  actions: {
    changeLocale: changeLocaleAction
  }
})
