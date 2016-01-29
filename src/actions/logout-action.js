import Cookie from 'js-cookie'

export default function logoutAction (tree) {
  Cookie.remove(process.env.TOKEN_COOKIE_NAME, {domain: process.env.TOKEN_COOKIE_DOMAIN})
  try {
    window.localStorage.clear()
  } catch (e) {
    // ~~
  }
  tree.set('user', null)
  tree.commit()
}
