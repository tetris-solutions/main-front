import Cookies from 'js-cookie'

export default function persistTokenAsCookie (response) {
  if (response.token) {
    try {
      Cookies.set(process.env.TOKEN_COOKIE_NAME, response.token, {
        domain: process.env.TOKEN_COOKIE_DOMAIN,
        expires: 1
      })
    } catch (e) {
      // ~~ dont even care
    }
  }
  return response
}
