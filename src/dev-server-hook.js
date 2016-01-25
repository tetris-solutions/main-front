import each from 'lodash/each'
import webpack from 'webpack'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHot from 'webpack-hot-middleware'
import webpackConfig from './webpack.config'

const compiler = webpack(webpackConfig)

export default function devServerHook (app) {
  app.use(webpackMiddleware(compiler, {headers: {'X-Webpack-Wizardry': 'true'}}))
  app.use(webpackHot(compiler))
  app.use((req, res, next) => {
    each(require.cache, (_, moduleName) => {
      if (moduleName.indexOf(__dirname) === 0) {
        console.log('remove from cache', moduleName)
        delete require.cache[moduleName]
      }
    })
    next()
  })
}
