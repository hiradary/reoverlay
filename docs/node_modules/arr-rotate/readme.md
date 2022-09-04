# arr-rotate [![Build Status](https://travis-ci.org/kevva/arr-rotate.svg?branch=master)](https://travis-ci.org/kevva/arr-rotate)

> Rotate all items in an array


## Install

```
$ npm install arr-rotate
```


## Usage

```js
const arrRotate = require('arr-rotate');

arrRotate(['foo', 'bar', 'unicorn'], 2);
//=> ['bar', 'unicorn', 'foo']

arrRotate(['foo', 'bar', 'unicorn'], 1);
//=> ['unicorn', 'foo', 'bar']

arrRotate(['foo', 'bar', 'unicorn'], -1);
//=> ['bar', 'unicorn', 'foo']
```


## API

### arrRotate(input, num)

#### input

Type: `Array`

Array to rotate.

#### num

Type: `number`<br>
Default: `0`

Number of steps to rotate.


## License

MIT © [Kevin Martensson](https://github.com/kevva)
