import isObject from 'lodash/isObject'
import window from 'global/window'

function loadCachedUser () {
  try {
    const state = JSON.parse(window.localStorage.tetrisState)
    return state && isObject(state) ? state : {}
  } catch (e) {
    return {}
  }
}

export default loadCachedUser
