export default (t, run) => Promise.resolve().then(() => {
  const {props, Component, test} = run.default(t)
  const render = require('./render').default
  const {element, unmount} = render(Component, props)
  const promise = test(element)

  return promise.then(() => {
    unmount()
  }, e => {
    unmount()
    return Promise.reject(e)
  })
  .catch(e => {
    console.log(e)
  })
})