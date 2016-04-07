import pick from 'lodash/pick'

export function getErrorFromResponse (response) {
  const defaultError = new Error('Sorry, we could not reach the API.')
  let err

  if (response) {
    err = response.data || pick(response, 'message', 'stack')
    err.status = response.status
  }

  return err && err.message ? err : defaultError
}
