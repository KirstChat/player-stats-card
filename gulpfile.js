// Imports
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Compile Sass into CSS
function compileScss() {
  return src('index.scss').pipe(sass()).pipe(dest('./dist/css'));
}

// Watch files for changes
function watchTask() {
  watch(['index.scss'], compileScss);
}

// Run functions
exports.default = series(compileScss, watchTask);
