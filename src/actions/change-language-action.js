export default (tree, language) => {
  if (tree.get('user')) {
    tree.set(['user', 'locale'], language)
  } else {
    tree.set('locale', language)
  }
  tree.commit()
}

