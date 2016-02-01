import Cookies from 'js-cookie'

export default tree => {
  const config = {headers: {}}

  let token

  try {
    token = Cookies.get(process.env.TOKEN_COOKIE_NAME)
  } catch (e) {
    // ~
  }

  if (token) config.headers.Authorization = `Bearer ${token}`

  const user = tree.get('user')
  const locale = tree.get('locale')
  const userLocale = user ? user.locale : null

  config.headers['Accept-Language'] = locale || userLocale || 'en'

  return config
}
