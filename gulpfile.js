var gulp = require("gulp"),
  prefixer = require("gulp-autoprefixer"),
  sass = require("gulp-sass");

gulp.task("html", () => {
  return gulp.src("dev/*.html").pipe(gulp.dest("dist"));
});

gulp.task("css", () => {
  return gulp
    .src("dev/styles.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefixer("last 2 versions"))
    .pipe(gulp.dest("dist"));
});

gulp.task("js", () => {
  return gulp.src("dev/script.js").pipe(gulp.dest("dist"));
});

gulp.task("watch", () => {
  require("./server");
  gulp.watch("dev/*.html", gulp.series("html"));
  gulp.watch("dev/styles.scss", gulp.series("css"));
  gulp.watch("dev/script.js", gulp.series("js"));
});
