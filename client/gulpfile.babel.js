'use strict';

import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import coffeeify from "coffeeify";
import sass from 'gulp-sass';

gulp.task("default", ["transpile", "sassify"]);

gulp.task("transpile", () => {

  return browserify("src/app.coffee", { transform: ['coffeeify'] })
    .transform("babelify")
    .bundle()
    .on("error", function(error){
      console.error( "\nError: ", error.message, "\n");
      this.emit("end");
     })
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("dist"));

});

gulp.task('sassify', () => {

  return gulp.src('styles/**/*.scss')
  .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
  .pipe(gulp.dest('dist/css'));

});

gulp.task("watch", ["transpile", "sassify"], () => {
  gulp.watch("src/**/*", ["transpile"]);
  gulp.watch("styles/**/*", ["sassify"]);
});
