#!/usr/bin/env node
var path = require('path')
var homerun = require('./')
var pkg = require(__dirname + '/../../package.json')

homerun(pkg.scripts, process.argv).spawn()
