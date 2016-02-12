import window from 'global/window'
import omit from 'lodash/omit'

export default function persistTree (tree) {
  try {
    window.localStorage.tetrisState = JSON.stringify(omit(tree, 'errors'))
  } catch (e) {
    console.log(e)
  }
}
