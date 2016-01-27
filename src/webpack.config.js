import webpack from 'webpack'
import path from 'path'
import each from 'lodash/each'
import pick from 'lodash/pick'

function passEnv () {
  const env = {}

  each(pick(process.env, 'FRONT_URL', 'USER_API_URL', 'TOKEN_COOKIE_DOMAIN', 'TOKEN_COOKIE_NAME'),
    (value, key) => env[key] = `"${value}"`)

  return env
}

export default {
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
