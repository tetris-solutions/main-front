import {getApiFetchConfig, pushResponseErrorToState} from 'tetris-iso/utils'
import {GET} from '@tetris/http'

export function loadTunnelInfo (tunnelCode, config) {
  return GET(`${process.env.USER_API_URL}/tunnel/${tunnelCode}`, config)
}

export function loadTunnelInfoAction (tree, tunnelCode) {
  return loadTunnelInfo(tunnelCode, getApiFetchConfig(tree))
    .then(response => {
      tree.set('tunnelInfo', response.data)
      tree.commit()
      return response
    })
    .catch(pushResponseErrorToState(tree))
}

export function loadTunnelInfoActionServerAdaptor (req, res) {
  return loadTunnelInfoAction(res.locals.tree, req.params.tunnelCode)
}

export function loadTunnelInfoActionRouterAdaptor (state, tree) {
  return loadTunnelInfoAction(tree, state.params.tunnelCode)
}
