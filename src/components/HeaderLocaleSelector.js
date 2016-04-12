import React from 'react'
import {changeLocaleAction} from '@tetris/front-server/lib/actions/change-locale-action'
import {branch} from 'baobab-react/higher-order'
import LocaleSelector from '@tetris/front-server/lib/components/LocaleSelector'

export function HeaderLocaleSelector (props) {
  return (
    <form className='navbar-form navbar-right'>
      <div className='form-group'>
        <LocaleSelector {...props} className='form-control'/>
      </div>
    </form>
  )
}

HeaderLocaleSelector.displayName = 'Header-Locale-Selector'

export default branch(HeaderLocaleSelector, {
  cursors: {
    userLocale: ['user', 'locale'],
    locale: ['locale']
  },
  actions: {
    changeLocale: changeLocaleAction
  }
})
