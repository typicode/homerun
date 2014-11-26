var assert = require('assert')
var homerun = require('../')

var pkg = {
  scripts: {
    add: 'node test/add'
  }
}


homerun(pkg, [,, 'add', '1', '2']).exec(function(err, stdout, stderr) {
  assert.equal('3\n', stdout)
  assert.equal('', stderr)
  assert.equal(err, null)
})

homerun(pkg, [,, 'unknown']).exec(function(err, stdout, stderr) {
  assert.notEqual(err, null)
  assert.equal(err.code, 1)
})

homerun(pkg, [,,]).exec(function(err, stdout, stderr) {
  assert.notEqual(err, null)
  assert.equal(err.code, 1)
})

pkg.scripts.default = 'node test/help'
homerun(pkg, [,, 'unknown']).exec(function(err, stdout, stderr) {
  assert.equal('help\n', stdout)
  assert.equal(err, null)
})

homerun(pkg, [,,]).exec(function(err, stdout, stderr) {
  assert.equal('help\n', stdout)
  assert.equal(err, null)
})
