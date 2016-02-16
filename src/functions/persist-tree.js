import window from 'global/window'
import omit from 'lodash/omit'

/**
 * saves state tree object to localStorage
 * @param {object} tree state tree object
 * @returns {undefined}
 */
export default function persistTree (tree) {
  try {
    window.localStorage.tetrisState = JSON.stringify(omit(tree, 'errors'))
  } catch (e) {
    console.log(e)
  }
}
