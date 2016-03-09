"use strict";

var gulp         = require("gulp"),
	  concat       = require("gulp-concat"),
    cssnano      = require("gulp-cssnano"), // minify
    notify 	     = require("gulp-notify"),
    uglify 	     = require("gulp-uglify"),
    rename       = require("gulp-rename"), // to rename any file
    sass         = require('gulp-sass'),
    postcss      = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    livereload   = require('gulp-livereload'),
    sourcemaps   = require('gulp-sourcemaps');

var config = {
   sassPath: "public/sass",
   bowerDir: "public/libs"
}

var processors = [
  autoprefixer
];

// moving font-awesome
gulp.task("icons", function() {
  return gulp.src(config.bowerDir + "/font-awesome/fonts/**.*")
    .pipe(gulp.dest("public/fonts"));
});

gulp.task("sass", function() {
  return gulp.src(config.sassPath + "/main.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest("./public/dist"))
    .pipe(postcss(processors))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano({safe: true}))
    .on("error", notify.onError(function(error) {
      return "Error: " + error.message;
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("./public/dist"))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload());
});

gulp.task('js', function() {
  return gulp.src(['./public/scripts/**/*.js', '!./public/scripts/**/*.spec.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest('./public/dist'))
    .pipe(livereload());
});

gulp.task("watch", function() {
  livereload.listen();
  gulp.watch(config.sassPath + "/*.scss", ["sass"]);
  gulp.watch("public/scripts/**/*.scss", ["sass"]);
  gulp.watch('public/scripts/**/*.js', ['js']);
});

gulp.task("default", ["icons", "css"]);

// gulp.task('sass:watch', function () {
//   gulp.watch('../public/scripts/core/*.scss', ['sass']);
// });
