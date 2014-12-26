var cp = require('child_process')
var parse = require('shell-quote').parse

module.exports = function(scripts, argv) {
  process.env.PATH =  './node_modules/.bin:' + process.env.PATH

  // Extract args
  var argString = argv.slice(3).join(' ')

  // Pick script
  var name = argv[2]
  var script
  if (name) {
    if (scripts[name]) {
      script = scripts[name]
    } else if (scripts['default']) {
      script = scripts['default']
    }
  } else {
    if (scripts['blank']) {
      script = scripts['blank']
    }
  }

  return {
    spawn: function() {
      if (script) {

        // Extract cmd and rebuild args
        var parsed = parse(script + ' ' + argString, process.env)
        var cmd = parsed.shift()
        var argArray = parsed

        // Spawn
        return cp.spawn(cmd, argArray, {
            stdio: 'inherit'
          })
          .on('error', function(err) {
            console.error(err)
            process.exit(1)
          })
          .on('exit', process.exit)
          .on('close', process.exit)
      } else {
        process.exit(1)
      }
    },
    exec: function(cb) {
      if (script) {
        return cp.exec(script + ' ' + argString, cb)
      } else {
        cb({ code: 1 }, '', '')
      }
    }
  }
}
