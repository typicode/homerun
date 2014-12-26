var assert = require('assert')
var homerun = require('../')

var scripts = {
  add: 'node test/add'
}

// Test without default and blank scripts
homerun(scripts, [,, 'add', '1', '2']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('', stderr)
  assert.equal('3\n', stdout)
})

homerun(scripts, [,, 'unknown']).exec(function(err, stdout, stderr) {
  assert.notEqual(err, null)
  assert.equal(err.code, 1)
})

homerun(scripts, [,,]).exec(function(err, stdout, stderr) {
  assert.notEqual(err, null)
  assert.equal(err.code, 1)
})

// Test with default and blank scripts
scripts.default = 'echo default'
scripts.blank = "echo blank"

homerun(scripts, [,, 'add', '1', '2']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('', stderr)
  assert.equal('3\n', stdout)
})

homerun(scripts, [,, 'unknown']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('default\n', stdout)
})

homerun(scripts, [,,]).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('blank\n', stdout)
})

// Test with environment variable
scripts.env = "echo $HOME $1"

homerun(scripts, [,, 'env', 'foo']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal(process.env.HOME + ' foo\n', stdout)
})
