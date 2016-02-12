import buildDOM from './helpers/dom'
import test from 'ava'
import testComponent from './helpers/test-component'

test('show help text on empty password', t =>
  buildDOM().then(() =>
    testComponent(t, require('./tests/login-empty-password'))))

test('show help text on empty email', t =>
  buildDOM().then(() =>
    testComponent(t, require('./tests/login-empty-password'))))
