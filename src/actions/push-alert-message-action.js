/**
 * pushes a success alert to the state tree
 * @param {Baobab} tree state tree
 * @param {String} messageName predefined message
 * @param {String} [level=warning] alert level
 * @returns {undefined}
 */
export function pushAlertMessageAction (tree, messageName, level = 'warning') {
  const message = tree.get(['intl', 'messages', messageName])
  tree.push('alerts', {
    level,
    message
  })
}
