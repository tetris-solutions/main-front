// esse arquivo é escrito em commonjs e js legado
// pra que o usuário possa rodar `webpack` normalmente da pasta src
var webpack = require('webpack')
var path = require('path')
var each = require('lodash/each')
var pick = require('lodash/pick')

function passEnv () {
  var env = {}

  each(pick(process.env, 'FRONT_URL', 'USER_API_URL', 'TOKEN_COOKIE_DOMAIN', 'TOKEN_COOKIE_NAME', 'LOCALE_COOKIE_NAME'),
    function (value, key) {
      env[key] = `"${value}"`
    })

  return env
}

module.exports = {
  devtool: 'eval-source-map',
  context: __dirname,
  entry: [
    'webpack-hot-middleware/client',
    path.normalize(__dirname + '/client.js')
  ],
  output: {
    path: path.normalize(__dirname + '/../public/'),
    filename: 'client.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': passEnv()
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /node_modules/,
      include: __dirname,
      loader: 'babel',
      query: {
        plugins: [
          ['react-transform', {
            transforms: [
              {
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals: ['module']
              }, {
                transform: 'react-transform-catch-errors',
                imports: ['react', 'redbox-react']
              }
            ]
          }]
        ]
      }
    }]
  }
}
