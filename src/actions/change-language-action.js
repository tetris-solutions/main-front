export default (tree, language) => {
  tree.set('locale', language)

  if (tree.get('user')) {
    tree.set(['user', 'locale'], language)
  }

  tree.commit()
}

