import isPlainObject from 'lodash/isPlainObject'
import window from 'global/window'

/**
 * loads state from localStorage
 * @returns {object} retrived state object
 */
function loadCachedUser () {
  try {
    const state = JSON.parse(window.localStorage.tetrisState)
    return state && isPlainObject(state) ? state : {}
  } catch (e) {
    return {}
  }
}

export default loadCachedUser
