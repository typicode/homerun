var assert = require('assert')
var homerun = require('../')

var scripts = {
  add: 'node test/add'
}

// Test without unknown and index scripts
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

// Test with unknown and index scripts
scripts.unknown = 'echo unknown'
scripts.index = "echo index"

homerun(scripts, [,, 'add', '1', '2']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('', stderr)
  assert.equal('3\n', stdout)
})

homerun(scripts, [,, 'unknown']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('unknown\n', stdout)
})

homerun(scripts, [,,]).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('index\n', stdout)
})

// Test with environment variable
scripts.env = "echo $HOME $1"

homerun(scripts, [,, 'env', 'foo']).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal(process.env.HOME + ' foo\n', stdout)
})
