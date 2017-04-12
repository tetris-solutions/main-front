import React from 'react'
import createReactClass from 'create-react-class'
import PropTypes from 'prop-types'
import csjs from 'csjs'
import StyledMixin from './mixins/styled'
import SimpleInput from './SimpleInput'
import {changeLocaleAction} from 'tetris-iso/actions'
import Tooltip from 'tetris-iso/Tooltip'
import startsWith from 'lodash/startsWith'

const style = csjs`
.container {
  padding-top: 20vh;
  height: 100vh;
  background-color: #e5e5e5;
}
.input {
  color: #5f5f5f !important; 
  background-color: #e5e5e5 !important;
  border-radius: 2px;
}
.input::-webkit-input-placeholder {
  opacity: 1;
  font-weight: bold;
  color: #bdbdbd;
}
.input::-moz-placeholder {
  opacity: 1;
  font-weight: bold;
  color: #bdbdbd;
}
.input:-webkit-autofill,
.input:-webkit-autofill:hover, 
.input:-webkit-autofill:focus
.input:-webkit-autofill {
  background-color: #e5e5e5 !important;
  -webkit-box-shadow: 0 0 0px 1000px #e5e5e5 inset;
}
.box {
  padding: 46px 50px; 
  background: white;
  width: 340px;
  border-radius: 3px;
  margin: 0 auto;
  box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);
}
.logo {
  display: block;
  width: 140px;
  height: auto;
  margin: 0 auto 32px auto;
}
.lang {
  display: block;
  width: auto;
  padding: 0 1em;
  cursor: pointer;
  font-size: medium;
  line-height: 2em;
}
.lang > small {
  margin-left: 10px;
  text-transform: uppercase;
  color: rgb(100, 100, 100);
}
.lang:hover {
  background: #eee;
}
@media (max-width: 400px) {
  .box {
    width: 96%;
  }
}`

export const Input = props => <SimpleInput className={String(style.input)} {...props} />

function normalizeLocale (locale) {
  if (startsWith(locale, 'en')) return 'en'
  if (startsWith(locale, 'pt')) return 'pt-BR'

  return locale
}

const localeFlagMap = {
  en: 'gb',
  'pt-BR': 'br'
}

const noop = () => false

function Language ({locale, placeholder, select}) {
  locale = normalizeLocale(locale)
  const chooseMe = () => select(locale)

  return (
    <div className={String(style.lang)} onClick={placeholder ? noop : chooseMe}>
      <span className={`flag-icon flag-icon-${localeFlagMap[locale]}`}/>

      {placeholder ? null : (
        <small>{locale}</small>
      )}
    </div>
  )
}
Language.displayName = 'Language'
Language.propTypes = {
  placeholder: PropTypes.bool,
  locale: PropTypes.string.isRequired,
  select: PropTypes.func
}

export function LangMenu (props, {locales: selected, tree}) {
  const select = locale => changeLocaleAction(tree, locale)

  return (
    <div>
      <Language locale={selected} placeholder/>
      <Tooltip hover>
        <div>
          <Language locale='en' select={select}/>
          <Language locale='pt-BR' select={select}/>
        </div>
      </Tooltip>
    </div>
  )
}

LangMenu.contextTypes = {
  locales: PropTypes.string.isRequired,
  tree: PropTypes.object.isRequired
}

const AuthScreen = createReactClass({
  displayName: 'Auth-Screen',
  mixins: [StyledMixin],
  style,
  propTypes: {
    children: PropTypes.node.isRequired
  },
  render () {
    return (
      <div className={`container-fluid ${style.container}`}>
        <div className={`${style.box}`}>
          <img className={`${style.logo}`} src='/img/tetris-logo.png'/>
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default AuthScreen
