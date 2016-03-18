var each = require('lodash/each')
var pick = require('lodash/pick')

module.exports = function passEnv () {
  var env = {}

  each(pick(process.env,

    'NODE_ENV',
    'FRONT_URL',
    'USER_API_URL',
    'TOKEN_COOKIE_DOMAIN',
    'TOKEN_COOKIE_NAME',
    'LOCALE_COOKIE_NAME'),

    function (value, key) {
      env[key] = `"${value}"`
    })

  return env
}
