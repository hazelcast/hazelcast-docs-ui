'use strict'

const stylelint = require('gulp-stylelint-esm')
const vfs = require('vinyl-fs')

module.exports = (files) => (done) =>
  vfs
    .src(files)
    .pipe(stylelint.default({
      reporters: [
        { formatter: 'string', console: true },
      ],
      failAfterError: true,
      fix: false,
    }))
    .on('error', done)
