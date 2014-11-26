var cp = require('child_process')
var parse = require('shell-quote').parse

module.exports = function(pkg, argv) {
  process.env.PATH =  './node_modules/.bin:' + process.env.PATH

  // Extract args
  var args = argv.slice(3).join(' ')

  // Pick script
  var name = argv[2]
  var scripts = pkg.scripts
  if (!scripts.hasOwnProperty(name)) name = 'default'
  var script = scripts[name]

  return {
    spawn: function() {
      if (script) {
        // Extract cmd and rebuild args
        var parsed = parse(script + ' ' + args, process.env)
        var cmd = parsed.shift()
        var args = parsed

        // Spawn
        return cp.spawn(cmd, args, {
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
        return cp.exec(script + ' ' + args, cb)
      } else {
        cb({ code: 1 }, '', '')
      }
    }
  }
}
