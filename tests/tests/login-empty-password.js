import delay from 'delay'
import ReactTestUtils from 'react-addons-test-utils'
import {Login} from '../../src/components/Login'

export default t => {
  return {
    Component: Login,
    props: {
      actions: {
        login (email, password) {
          return new Promise((_, reject) => {
            t.same(email, 'x@x.com')
            reject({fields: {password: 'ABC'}})
          })
        }
      }
    },
    test (element) {
      const form = ReactTestUtils.findRenderedDOMComponentWithTag(element, 'form')

      t.ok(form)
      form.elements.email.value = 'x@x.com'
      ReactTestUtils.Simulate.submit(form)

      return delay(1000)
        .then(() => {
          const formGroup = form.elements.password.parentNode
          const className = formGroup.getAttribute('class')
          t.ok(className.match(/has-error/g))
        })
    }
  }
}
