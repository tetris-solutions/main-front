import isObject from 'lodash/isObject'
import global from 'global'

function loadCachedUser () {
  try {
    const state = JSON.parse(global.localStorage.tetrisState)
    return state && isObject(state) ? state : {}
  } catch (e) {
    return {}
  }
}

export default loadCachedUser
