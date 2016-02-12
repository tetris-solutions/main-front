import jsdom from 'jsdom'

const html = `
<html>
<head>
<title>NOPE</title>
</head>
<body>
</body>
</html>`

const buildDOM = () => new Promise((resolve, reject) =>
  jsdom.env(html, (err, window) => {
    if (err) return reject(err)

    // require('ladda')

    for (let key in window) {
      if (!window.hasOwnProperty(key)) continue
      if (key in global) continue

      global[key] = window[key]
    }

    resolve(window)
  }))

let cached

export default () => {
  if (!cached) {
    cached = buildDOM()
  }
  return cached
}