const assign = require('lodash/assign')

module.exports = assign({},
  require('./nav'),
  require('./exceptions'),
  require('./callToAction'),
  require('./success'),
  require('./labels'),
  require('./headers'),
  require('./text'))
