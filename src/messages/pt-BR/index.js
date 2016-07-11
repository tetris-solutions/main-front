const assign = require('lodash/assign')
const nav = require('./nav')
const exceptions = require('./exceptions')
const callToAction = require('./callToAction')
const successMessages = require('./success')
const labels = require('./labels')
const headers = require('./headers')

module.exports = assign({
  greetingMessage: 'Bem vindo a lugar nenhum'
}, nav, exceptions, callToAction, successMessages, labels, headers)
