import test from 'ava'
import validateUser from '../functions/validate-user'
import MissingRequiredFieldError from '../exceptions/MissingRequiredFieldError'
import InvalidArgumentError from '../exceptions/InvalidArgumentError'

test('throws on empty user', t =>
  validateUser(null)
    .catch(rej => {
      t.true(rej instanceof InvalidArgumentError)
    }))

test('throws on undefined email', t =>
  validateUser({password: '123', name: 'abc'})
    .catch(rej => {
      t.true(rej instanceof MissingRequiredFieldError)
      t.is(rej.field, 'email')
    }))

test('throws on undefined password', t =>
  validateUser({email: 'abc@gmail.com', name: 'abc'})
    .catch(rej => {
      t.true(rej instanceof MissingRequiredFieldError)
      t.is(rej.field, 'password')
    }))

test('does not throw on undefined password when `requiresPassword` is `false`', t =>
  validateUser({email: 'abc@gmail.com', name: 'abc'}, false)
    .catch(() => {
      t.fail('this never happens')
    })
    .then(() => t.pass()))

test('throws on undefined name', t =>
  validateUser({email: 'abc@gmail.com', password: '123'})
    .catch(rej => {
      t.true(rej instanceof MissingRequiredFieldError)
      t.is(rej.field, 'name')
    }))

test('accepts a valid user', t =>
  validateUser({email: 'abc@gmail.com', password: '123', name: 'person'})
    .then(() => t.pass()))
