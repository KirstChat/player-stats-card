// Imports
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');

// Compile Sass into CSS
function compileScss() {
  return src('./assets/scss/**/*.scss')
    .pipe(sass())
    .pipe(prefix())
    .pipe(dest('./dist/css'));
}

// Watch files for changes
function watchTask() {
  watch(['./assets/scss/**/*.scss'], compileScss);
}

// Run functions
exports.default = series(compileScss, watchTask);
