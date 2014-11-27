var assert = require('assert')
var homerun = require('../')

var pkg = {
  scripts: {
    add: 'node test/add'
  }
}

// Test without default and blank scripts
homerun(pkg, [,, 'add', '1', '2']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('', stderr)
  assert.equal('3\n', stdout)
})

homerun(pkg, [,, 'unknown']).exec(function(err, stdout, stderr) {
  assert.notEqual(err, null)
  assert.equal(err.code, 1)
})

homerun(pkg, [,,]).exec(function(err, stdout, stderr) {
  assert.notEqual(err, null)
  assert.equal(err.code, 1)
})

// Test with default and blank scripts
pkg.scripts.default = 'echo default'
pkg.scripts.blank = "echo blank"

homerun(pkg, [,, 'add', '1', '2']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('', stderr)
  assert.equal('3\n', stdout)
})

homerun(pkg, [,, 'unknown']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('default\n', stdout)
})

homerun(pkg, [,,]).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('blank\n', stdout)
})
