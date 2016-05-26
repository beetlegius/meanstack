import gulp from "gulp";
import browserify from "browserify";
import source from "vinyl-source-stream";
import coffeeify from "coffeeify";

gulp.task("default", ["transpile"]);

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

gulp.task("watch", ["transpile"], () => {
  gulp.watch("src/**/*", ["transpile"]);
});
