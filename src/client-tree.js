import Tree from 'baobab'
// import loadCachedState from './functions/load-cached-state'
// import cacheState from './functions/cache-state'
import merge from 'lodash/merge'
import window from 'global/window'
import defaultState from './default-state'
import Cookies from 'js-cookie'

const tree = new Tree(merge(defaultState, /* loadCachedState(), */window.backendPayload))

// tree
//   .select('user')
//   .on('update', () => cacheState(tree.get()))

tree.select('locale').on('update', ({data: {currentData}}) => {
  Cookies.set(process.env.LOCALE_COOKIE_NAME, currentData, {
    domain: process.env.TOKEN_COOKIE_DOMAIN,
    expires: 1
  })
})

export default tree
