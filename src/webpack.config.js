// esse arquivo é escrito em commonjs e js legado
// pra que o usuário possa rodar `webpack` normalmente da pasta src

var path = require('path')

require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
  silent: true
})

module.exports = process.env.DEV_SERVER
  ? require('./webpack.config.dev')
  : require('./webpack.config.prod')
