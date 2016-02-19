#!/usr/bin/env node
var $ = require('shelljs')
var fs = require('fs')

$.mv('.babelrc', '_babelrc')
$.rm('-rf', '.tmp')
$.mkdir('-p', '.tmp')
$.cd('.tmp')

var pkg = require('../package.json')

$.cp('../package.json', '.')

$.ln('-s', '../src', 'src')
$.ln('-s', '../docs', 'docs')
$.ln('-s', '../node_modules', 'node_modules')
$.ln('-s', '../.git', '.git')

const entries = ['src/server.js']//, 'src/client.js']

/**
 * @todo create sub directory documentation structure
 */
entries.forEach(entry => {
  pkg.main = entry
  fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2))
  $.exec('node_modules/.bin/documentation build --github -f html -o docs')
})

$.cd('..')
$.exec('git add docs')
$.rm('-rf', '.tmp')
$.mv('_babelrc', '.babelrc')
