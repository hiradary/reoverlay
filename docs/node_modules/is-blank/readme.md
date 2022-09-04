# is-blank [![Build Status](https://travis-ci.org/johnotander/is-blank.svg?branch=master)](https://travis-ci.org/johnotander/is-blank) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Check whether a value is empty or blank.

## Installation

```
npm i -S is-blank
```

## Usage

```js
const isBlank = require('is-blank')

isBlank([])              // => true
isBlank({})              // => true
isBlank(0)               // => true
isBlank(function(){})    // => true
isBlank(null)            // => true
isBlank(undefined)       // => true
isBlank('')              // => true
isBlank('    ')          // => true
isBlank('\r\t\n ')       // => true

isBlank(['a', 'b'])      // => false
isBlank({ a: 'b' })      // => false
isBlank('string')        // => false
isBlank(42)              // => false
isBlank(function(a,b){}) // => false
```

## Related

- [is-empty](https://github.com/ianstormtaylor/is-empty)
- [is-whitespace](https://github.com/jonschlinkert/is-whitespace)
- [is-present](https://github.com/johnotander/is-present)

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by [John Otander](http://johnotander.com) ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
