import test from 'ava'
import mock from 'mock-require'

const TOKEN = 'ABCDE'

test('fires a GET request to the user api root passing token in `Authorization` header', t => {
  mock('@tetris/http', {
    GET (url, config) {
      t.is(url, process.env.USER_API_URL)
      t.ok(config)
      t.ok(config.headers)
      t.is(config.headers.Authorization, `Bearer ${TOKEN}`)
    }
  })
  require('./get-user-by-token').getUserByToken(TOKEN)
})
