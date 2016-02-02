const loadedScripts = {}
const onTheFly = {}

const loadScript = src => new Promise((resolve, reject) => {
  if (loadedScripts[src]) return resolve()

  const script = document.createElement('script')

  script.src = src
  script.onload = () => {
    loadedScripts[src] = true
    delete onTheFly[src]
    resolve()
  }
  script.onerror = err => {
    delete onTheFly[src]
    reject(err)
  }

  document.body.appendChild(script)
})

export default src => {
  if (!onTheFly[src]) {
    onTheFly[src] = loadScript(src)
  }
  return onTheFly[src]
}
