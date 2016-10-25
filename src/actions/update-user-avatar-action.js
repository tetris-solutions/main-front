import {uploadImg} from '../api/upload-img'

export const updateUserAvatarAction = (tree, blob) =>
  uploadImg(tree, `${process.env.USER_API_URL}/avatar`, blob)
