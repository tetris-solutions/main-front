import React from 'react'
import skinDeep from 'skin-deep'
import {root} from 'baobab-react/higher-order'

export default ({Component, tree, displayName, props}) => {
  return skinDeep.shallowRender(React.createElement(root(Component, tree), props)).dive([displayName]).getMountedInstance()
}
