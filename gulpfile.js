"use strict";

var gulp         = require("gulp"),
	  concat       = require("gulp-concat"),
    cssnano      = require("gulp-cssnano"), // minify
    notify 	     = require("gulp-notify"),
    uglify 	     = require("gulp-uglify"),
    rename       = require("gulp-rename"), // to rename any file
    sass         = require('gulp-ruby-sass'),
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

gulp.task("css", function() {
  return sass(config.sassPath + "/main.scss", { sourcemap: true, style: "expanded" })
    .pipe(postcss(processors))
    .pipe(gulp.dest("public/css"))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .on("error", notify.onError(function(error) {
      return "Error: " + error.message;
    }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("public/css"))
    .pipe(notify({ message: 'Styles task complete' }))
    .pipe(livereload());
});

// Rerun the task when a file changes
gulp.task("sass:watch", function() {
  livereload.listen({
    reloadPage: "public/index.html"
  });
  gulp.watch(config.sassPath + "/*.scss", ["css"]);
  gulp.watch("public/scripts/**/*.scss", ["css"]);
});

gulp.task("default", ["icons", "css"]);

// gulp.task('sass:watch', function () {
//   gulp.watch('../public/scripts/core/*.scss', ['sass']);
// });
