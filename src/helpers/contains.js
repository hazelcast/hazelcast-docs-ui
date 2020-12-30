'use strict'

module.exports =
(needle, haystack, options) => {
  return (haystack.indexOf(needle) > -1) ? options.fn(this) : options.inverse(this);
};