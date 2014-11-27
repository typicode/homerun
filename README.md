# Homerun [![](https://badge.fury.io/js/homerun.svg)](http://badge.fury.io/js/homerun) [![](https://travis-ci.org/typicode/homerun.svg?branch=master)](https://travis-ci.org/typicode/homerun)

![](http://i.imgur.com/Bs7wA8v.gif)

Since npm 2.0, you can pass arguments to scripts... wait... what if you coud use that for creating CLIs?

Homerun is a little experiment that lets you just do that. If you need more, I highly recommend [minimist](https://github.com/substack/minimist).

## Usage

Let's say you have a script called `add` that you can run this way:

```bash
$ npm run add -- 1 2
3
```

Simply install `homerun` and add it to your `package.json`

`npm install homerun --save`

```javascript
{
  "name": "mycli"
  "bin": "./node_modules/.bin/homerun"
  "scripts": {
    "add": "node commands/add"
  }
}
```

Now, without any other setup, if you `npm link` or `npm publish` you get a CLI for free:

```bash
$ mycli add 1 2
3
# BOOM!
```

## Options

Homerun will use this scripts in case no command is provided or matches.

```javascript
"scripts": {
  "blank": "npm start"          // mycli
  "default": "echo usage: ..."  // mycli unknown command
}
```

## Module

If you need to customize, you can use homerun as a module.

```javascript
var homerun = require('homerun')
var pkg = require('./package.json')

// Do things with pkg.scripts...

homerun(pkg, process.argv).spawn()
```

## Test

Testing is easy too, simply run `homerun.exec()` to test output and exit code.

```javascript
var argv = [,, 'add', '1', '2']

homerun(pkg, argv).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('', stderr)
  assert.equal('3\n', stdout)
})
```

## License

MIT - [Typicode](https://github.com/typicode)
