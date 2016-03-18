// esse arquivo é escrito em commonjs e js legado
// pra que o usuário possa rodar `webpack` normalmente da pasta src

require('dotenv').config({silent: true})

module.exports = process.env.BUILD_PROD
  ? require('./webpack.config.prod')
  : require('./webpack.config.dev')
