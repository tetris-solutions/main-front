import global from 'global'
import omit from 'lodash/omit'

export default function persistTree (tree) {
  try {
    global.localStorage.tetrisState = JSON.stringify(omit(tree, 'errors'))
  } catch (e) {
    console.log(e)
  }
}
