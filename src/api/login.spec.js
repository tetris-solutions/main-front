import test from 'ava'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import mock from 'mock-require'
import delay from 'delay'

const login = (...args) => {
  delete require.cache['./login']
  return require('./login').default(...args)
}
const http = {}
mock('@tetris/http', http)

test('fires a POST request to the login user api', t => {
  const credentials = {email: 'abc@xx.com', password: '123'}
  const passedConfig = {XXX: 123}

  http.POST = (url, receivedConfig) => {
    t.is(url, `${process.env.USER_API_URL}/login`)
    t.ok(receivedConfig)
    t.ok(receivedConfig.body)
    t.not(receivedConfig, passedConfig, 'should be a new object')
    t.is(receivedConfig.XXX, passedConfig.XXX)
    t.same(receivedConfig.body, credentials)
    return Promise.resolve()
  }

  return login(credentials.email, credentials.password, passedConfig)
})

test('throws on empty email or password', t =>
  delay(100).then(() => {
    http.POST = () => {
      t.fail('request should never happen when credentials are empty')
    }

    return login()
      .catch(e => {
        t.true(e instanceof MissingRequiredFieldError)
        t.is('email', e.field)
        return login('abc@xxx.com')
      })
      .catch(e => {
        t.true(e instanceof MissingRequiredFieldError)
        t.is('password', e.field)
      })
  }))

