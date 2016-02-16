import noop from 'lodash/noop'
import constant from 'lodash/constant'

export default {
  push: noop,
  createHref: constant('/')
}
