import {uploadImg} from '../api/upload-img'

export const updateCompanyIconAction = (tree, id, blob) =>
  uploadImg(tree, `${process.env.USER_API_URL}/company/${id}/icon`, blob)
