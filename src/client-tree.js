import Tree from 'baobab'
import loadCachedState from './functions/load-cached-state'
import persistTree from './functions/persist-tree'
import merge from 'lodash/merge'
import global from 'global'
import defaultState from './default-state'

const tree = new Tree(merge(defaultState, loadCachedState(), global.backendPayload))

tree
  .select('user')
  .on('update', () => persistTree(tree.get()))

export default tree
