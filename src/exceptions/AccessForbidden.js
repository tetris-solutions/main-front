import CustomException from '@tetris/base-lib/CustomException'

export default class AccessForbidden extends CustomException {
  constructor () {
    super('Acesso Negado')
  }
}

AccessForbidden.displayName = 'AccessForbidden'
