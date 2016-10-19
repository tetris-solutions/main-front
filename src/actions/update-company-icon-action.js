import {getApiFetchConfig} from 'tetris-iso/utils'

import forEach from 'lodash/forEach'

export const updateCompanyIconAction = (tree, id, blob) => new Promise((resolve, reject) => {
  const xhr = new window.XMLHttpRequest()
  const url = `${process.env.USER_API_URL}/company/${id}/avatar`
  const {headers} = getApiFetchConfig(tree)

  function onLoad () {
    if (xhr.status !== 200) {
      tree.push('alerts', {
        level: 'error',
        message: 'Could not save'
      })
    } else {
      resolve()
    }
  }

  xhr.open('PUT', url, true)
  xhr.upload.addEventListener('load', onLoad)
  xhr.overrideMimeType('text/plain; charset=x-user-defined-binary')

  forEach(headers, (value, header) => {
    xhr.setRequestHeader(header, value)
  })

  xhr.send(blob)
})
