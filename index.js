var cp = require('child_process')
var parse = require('shell-quote').parse

module.exports = function(pkg, argv) {
  process.env.PATH =  './node_modules/.bin:' + process.env.PATH

  // Extract args
  var args = argv.slice(3).join(' ')

  // Pick script
  var name = argv[2] ? argv[2] : 'help'

  var scripts = pkg.scripts
  var script = scripts[name]

  // Extract cmd and rebuild args
  var parsed = parse(script + ' ' + args, process.env)
  var cmd = parsed.shift()
  var args = parsed

  return {
    spawn: function() {
      return cp.spawn(cmd, args, {
          stdio: 'inherit'
        })
        .on('error', function(err) {
          console.error(err)
          process.exit(1)
        })
        .on('exit', process.exit)
        .on('close', process.exit)
    },
    exec: function(cb) {
      return cp.exec([cmd].concat(args).join(' '), cb)
    }
  }
}
