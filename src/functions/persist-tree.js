import global from 'global'

export default function persistTree (tree) {
  try {
    global.localStorage.tetrisState = JSON.stringify(tree)
  } catch (e) {
    console.log(e)
  }
}
