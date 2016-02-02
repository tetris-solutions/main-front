import Tree from 'baobab'
import loadCachedState from './functions/load-cached-state'
import persistTree from './functions/persist-tree'
import merge from 'lodash/merge'
import global from 'global'
import defaultState from './default-state'
import Cookies from 'js-cookie'

const tree = new Tree(merge(defaultState, loadCachedState(), global.backendPayload))

tree
  .select('user')
  .on('update', () => persistTree(tree.get()))

tree.select('locale').on('update', ({data: {currentData}}) => {
  Cookies.set(process.env.LOCALE_COOKIE_NAME, currentData, {
    domain: process.env.TOKEN_COOKIE_DOMAIN,
    expires: 1
  })
})

export default tree
