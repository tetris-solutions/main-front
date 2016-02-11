import test from 'ava'
import render from './helpers/render'
import {Login} from '../src/components/Login'

test('shows help text empty email', t => {
  const props = {
    actions: {
      login: (email, password) => {
        t.ok(email)
        t.ok(password)
      }
    }
  }

  return render(Login, props)
    .then(({component, find}) => {
      find(c => console.log(c))
    })
})
