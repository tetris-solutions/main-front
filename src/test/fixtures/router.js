import noop from 'lodash/noop'
import constant from 'lodash/constant'

export const router = {
  push: noop,
  createHref: constant('/')
}
