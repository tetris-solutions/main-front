import test from 'ava'
import includes from 'lodash/includes'
import window from 'global/window'
import loadScript from './load-script'
import uniq from 'lodash/uniq'
import size from 'lodash/size'

const fail = false
const scripts = []
const LOAD_INTERVAL = 300

function appendChild ({trigger, src}) {
  scripts.push(src)
  trigger()
}

function createElement () {
  const script = {}
  script.trigger = () => setTimeout(() => {
    if (!fail && script.onload) script.onload()
    if (fail && script.onerror) script.onerror()
  }, LOAD_INTERVAL)
  return script
}

window.document = {
  createElement,
  body: {appendChild}
}

test.beforeEach(t => {
  scripts.splice(0, scripts.length)
  t.is(scripts.length, 0)
})

const src = 'http://google.com/adwords.js'

test('script is created with correct `src`', t => {
  return loadScript(src)
    .then(() => {
      t.true(includes(scripts, src))
    })
})

test('avoids script duplication', t => {
  let then
  return loadScript(src)
    .then(() => {
      t.true(includes(scripts, src))
      then = Date.now()
      return loadScript(src)
    }).then(() => {
      t.true(Date.now() - then < LOAD_INTERVAL)
    })
})

test('batches multiple simultaneous script insertion into a single one', t => {
  const requests = [
    loadScript(src),
    loadScript(src),
    loadScript(src)
  ]
  const uniqueRequests = uniq(requests)
  t.is(1, size(uniqueRequests))
})
