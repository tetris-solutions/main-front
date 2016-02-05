import React from 'react'
import changeLanguageAction from '../actions/change-language-action'
import {branch} from 'baobab-react/higher-order'
import global from 'global'

const {PropTypes} = React

export const HeaderLanguageSelector = React.createClass({
  displayName: 'Language-Selector',
  propTypes: {
    userLocale: PropTypes.string,
    locale: PropTypes.string,
    actions: PropTypes.shape({
      changeLanguage: PropTypes.func
    })
  },
  onChangeLocale ({target: {value}}) {
    this.props.actions.changeLanguage(value)
    window.tetrisLoadLocale(value)
  },
  render () {
    return (
      <form className='navbar-form navbar-right'>
        <div className='form-group'>
          <select className='form-control' value={this.props.locale || this.props.userLocale} onChange={this.onChangeLocale}>
            <option value='en'>English</option>
            <option value='pt-BR'>Português</option>
          </select>
        </div>
      </form>
    )
  }
})

export default branch(HeaderLanguageSelector, {
  cursors: {
    userLocale: ['user', 'locale'],
    locale: ['locale']
  },
  actions: {
    changeLanguage: changeLanguageAction
  }
})
