'use strict';

var gulp       = require('gulp'),
	  concat     = require('gulp-concat'),
    minifyCSS  = require('gulp-minify-css'),
    notify 	   = require('gulp-notify'),
    uglify 	   = require('gulp-uglify'),
    rename     = require('gulp-rename'), // to rename any file
    sass       = require('gulp-sass');
 
gulp.task('sass', function () {
  gulp.src('public/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('public/**/*.scss', ['sass']);
});

// gulp.task('sass:watch', function () {
//   gulp.watch('../public/scripts/core/*.scss', ['sass']);
// });