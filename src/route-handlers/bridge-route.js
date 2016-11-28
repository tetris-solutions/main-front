const ONE_DAY = 1000 * 60 * 60 * 24

export function bridgeRoute (req, res) {
  const accessToken = new Buffer(req.params.token, 'base64').toString('ascii')
  const domain = process.env.TOKEN_COOKIE_DOMAIN
  const cookieName = process.env.TOKEN_COOKIE_NAME

  res.set('Authorization', `Bearer ${accessToken}`)
  res.cookie(cookieName, accessToken, {
    domain,
    expires: new Date(Date.now() + ONE_DAY)
  })

  res.redirect(req.query.next || '/dashboard')
}
