"use strict";

var gulp       = require("gulp"),
	  concat     = require("gulp-concat"),
    minifyCSS  = require("gulp-minify-css"),
    notify 	   = require("gulp-notify"),
    uglify 	   = require("gulp-uglify"),
    rename     = require("gulp-rename"), // to rename any file
    sass       = require("gulp-sass");

var config = {
   sassPath: "public/sass",
   bowerDir: "public/libs"
}

// moving font-awesome
gulp.task("icons", function() {
  return gulp.src(config.bowerDir + "/font-awesome/fonts/**.*")
    .pipe(gulp.dest("public/fonts"));
});

gulp.task("css", function() {
  return gulp.src(config.sassPath + "/main.scss")
    .pipe(sass({
        style: "compressed",
        loadPath: [
          config.bowerDir + "/bootstrap-sass/assets/stylesheets",
          config.bowerDir + "/font-awesome/scss",
        ]
    })
      .on("error", notify.onError(function(error) {
        return "Error: " + error.message;
      })))
    .pipe(gulp.dest("public/css"));
});

// Rerun the task when a file changes
gulp.task("sass:watch", function() {
  gulp.watch(config.sassPath + "/*.scss", ["css"]);
  gulp.watch("public/scripts/**/*.scss", ["css"]);
});

gulp.task("default", ["icons", "css"]);

// gulp.task('sass:watch', function () {
//   gulp.watch('../public/scripts/core/*.scss', ['sass']);
// });
