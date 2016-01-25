import webpack from 'webpack'
import path from 'path'

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
      'process.env': {}
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
