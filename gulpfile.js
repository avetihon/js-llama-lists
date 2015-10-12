'use strict';

var gulp       = require('gulp'),
	  concat     = require('gulp-concat'),
    minifyCSS  = require('gulp-minify-css'),
    notify 	   = require('gulp-notify'),
    uglify 	   = require('gulp-uglify'),
    rename     = require('gulp-rename'), // to rename any file
    sass       = require('gulp-sass');
 
gulp.task('sass', function () {
  gulp.src('sass/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
 
gulp.task('sass:watch', function () {
  gulp.watch('sass/**/*.scss', ['sass']);
});