import Cookies from 'js-cookie'
import merge from 'lodash/merge'

function includeToken (config) {
  try {
    const token = Cookies.get(process.env.TOKEN_COOKIE_NAME)
    if (token) {
      return merge(config, {headers: {Authorization: `Bearer ${token}`}})
    }
  } catch (e) {
    // ~~
  }

  return config
}

export default includeToken
