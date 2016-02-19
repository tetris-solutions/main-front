import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'

const compiler = webpack(webpackConfig)

export function devServerHook (app) {
  app.use(webpackMiddleware(compiler, {headers: {'X-Webpack-Wizardry': 'true'}}))
  app.use(webpackHot(compiler))
}

export default devServerHook
