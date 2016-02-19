import window from 'global/window'
import omit from 'lodash/omit'

/**
 * saves state tree object to localStorage
 * @param {Object} state state tree object
 * @returns {undefined}
 */
export function cacheState (state) {
  try {
    window.localStorage.tetrisState = JSON.stringify(omit(state, 'errors'))
  } catch (e) {
    console.log(e)
  }
}

export default cacheState
