# Homerun [![](https://travis-ci.org/typicode/homerun.svg?branch=master)](https://travis-ci.org/typicode/homerun) [![npm](https://img.shields.io/npm/v/homerun.svg?style=flat)](https://www.npmjs.com/package/homerun)

> Since npm 2.0, you can pass arguments to scripts... wait... what if you coud use that for creating CLIs?
Homerun is a little experiment that lets you just do that. If you need more, I highly recommend [minimist](https://github.com/substack/minimist).

## Usage

Let's say you have a script called `add` that you can run this way:

```bash
npm run add -- 1 2
3
```

Install homerun

```bash
npm install homerun --save
```

Add it to your `package.json`

```javascript
{
  "name": "cli"
  // Add homerun bin here
  "bin": "./node_modules/.bin/homerun" 
  "scripts": {
    "add": "node commands/add"
  }
}
```

Now, without any other setup, if you `npm link` or `npm publish` you get a CLI for free:

```bash
cli add 1 2
3
```

## Options

Homerun will use this scripts in case no command is provided or matches.

```javascript
"scripts": {
  "blank": "npm start"          // no command provided
  "default": "echo usage: ..."  // unknown command provided
}
```

## Module

If you need to customize, you can use homerun as a module.

```javascript
// index.js
var homerun = require('homerun')
var scripts = require('./package.json').scripts

homerun(scripts, process.argv).spawn()
```

```javascript
// package.json
{
  "bin": "index.js"
}
```

## Test

To test your commands, use `homerun.exec()`

```javascript
var argv = [,, 'add', '1', '2']

homerun(scripts, argv).exec(function(err, stdout, stderr) {
  assert.equal(err, null)
  assert.equal('', stderr)
  assert.equal('3\n', stdout)
})
```

## Limit

Homerun doesn't support multiple commands. For example, `echo foo && echo bar` won't work.

## License

MIT - [Typicode](https://github.com/typicode)

![](http://i.imgur.com/Bs7wA8v.gif)
