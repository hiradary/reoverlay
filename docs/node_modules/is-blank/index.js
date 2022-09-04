var isEmpty = require('is-empty')
var isWhitespace = require('is-whitespace')

function isString (object) {
  return typeof object === 'string'
}

module.exports = function (object) {
  return isString(object) && object.length ? isWhitespace(object) : isEmpty(object)
}
