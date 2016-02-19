import updateMe from '../api/update-me'
import {saveResponseTokenAsCookie} from '../functions/save-token-as-cookie'
import getApiFetchConfig from '../functions/get-api-fetch-config'

export default (tree, user) => updateMe(user, getApiFetchConfig(tree))
  .then(saveResponseTokenAsCookie)
  .then(response => {
    tree.merge('user', response.data)
    tree.commit()
  })
