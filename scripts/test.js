#!/usr/bin/env node

var $ = require('shelljs')
var path = require('path')

$.cd(path.resolve(__dirname, '..'))
$.echo('Pre compilation...')
$.exec('npm run transpilation >/dev/null 2>&1')
$.exec('NODE_ENV=production node_modules/.bin/ava')
